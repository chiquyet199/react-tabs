import React, {Component} from "react";
import {isEmpty, isEqual} from "underscore";
import {validate} from "../../utils/validators/common";
import FormPage from "../FormPage";
import {connect} from "react-redux";
import {
  clearProgress as clearProgressAction,
  updateProgress as updateProgressAction,
} from "../../actions/progress";
import {next as nextAction} from "../../actions/form";
import {go} from "../../actions/navigation";
import {
  showTopbarCenterText as showTopbarCenterTextAction,
  hideTopbarCenterText as hideTopbarCenterTextAction,
  updateTopbarButton as updateTopbarButtonAction,
  hideTopbarButton as hideTopbarButtonAction,
  showTopbarButton as showTopbarButtonAction,
} from "../../actions/topbar";
import {redirectToBaseRoute} from "../../utils/common";
import {
  bool,
  func,
  number,
  object,
  objectOf,
  oneOf,
  shape,
  string,
} from "prop-types";
import {updateTheme as updateThemeAction} from "../../actions/theme";

export class MultiPageForm extends Component {
  errors = false;

  constructor(props) {
    super(props);
    this.state = {
      originaltheme: props.globaltheme,
    };
  }

  handleFormSubmit = async values => {
    const {
      match: {
        params: {stage},
      },
      schema,
      next,
    } = this.props;
    const {next: nextLoc} = schema[stage];
    next({values, nextLoc});
  };

  revalidate = async (values, stage) => {
    const {schema, goTo} = this.props;
    const baseUrl = redirectToBaseRoute(null, {}, this.props.location, true);
    if (schema[stage] && schema[stage].properties) {
      const errors = !isEmpty(await validate(schema[stage].properties, values));
      if (this.errors) {
        this.errors = false;
      }
      if (errors && !this.errors) {
        this.errors = true;
        goTo(`/${baseUrl}/${stage}`);
      } else {
        this.errors = false;
      }
    }
  };

  toggleSkipButton = stage => {
    const {
      skipText,
      globaltheme,
      goTo,
      hideTopbarButton,
      showTopbarButton,
      updateTopbarButton,
      schema,
    } = this.props;
    const btnType =
      globaltheme === "dark" ? "transparent_white" : "transparent_green";
    if (stage) {
      const redirectAction = () => goTo(schema[stage].next);
      showTopbarButton();
      updateTopbarButton(true, skipText, redirectAction, btnType, null);
    } else {
      hideTopbarButton();
      updateTopbarButton(false, "", undefined, undefined, null);
    }
  };

  gotoInitialStage() {
    const {
      goTo,
      form: {DynamicForm},
      schema,
      location,
    } = this.props;
    const initialStage = Object.keys(schema).find(
      key => schema[key].prev === key,
    );
    const urlPrefix = redirectToBaseRoute(null, {}, location, true);
    const initialRoute = `/${urlPrefix}/${initialStage}`;

    if (initialStage && location.pathname !== initialRoute && !DynamicForm) {
      goTo(initialRoute);
    }
  }

  componentWillMount() {
    const {
      match: {
        params: {stage},
      },
      schema,
      pagetheme,
      globaltheme,
      updateTheme,
    } = this.props;

    this.gotoInitialStage();

    if (schema[stage] && schema[stage].skippable) {
      this.toggleSkipButton(stage);
    }
    if (pagetheme && pagetheme !== globaltheme) {
      updateTheme(pagetheme);
    }
  }

  componentDidMount() {
    const {
      match: {
        params: {stage},
      },
      showTopbarCenterText,
      updateProgress,
      schema,
      form,
      partialForm,
    } = this.props;
    if (!schema[stage]) {
      this.gotoInitialStage();

      return;
    }
    showTopbarCenterText(schema[stage].pageTitle);
    if (schema[stage] && schema[stage].progress >= 0) {
      updateProgress(schema[stage].progress);
    } else {
      throw new Error("No schema for page provided!");
    }
    const values = (form.DynamicForm && form.DynamicForm.values) || {};
    if (!isEqual(values, partialForm.values)) {
      const prevStage = schema[stage].prev;
      if (values) {
        this.revalidate(values, prevStage);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.history.action === "POP") {
        const values =
          (prevProps.form.DynamicForm && prevProps.form.DynamicForm.values) ||
          {};
        const prevStage = prevProps.schema[prevProps.match.params.stage].prev;
        this.revalidate(values, prevStage);
      }
    }

    const {stage: prevStage} = prevProps.match.params;
    const {
      match: {
        params: {stage: nextStage},
      },
      updateProgress,
      schema,
      showTopbarCenterText,
    } = this.props;
    const nextSchema = schema[nextStage];
    if (!nextSchema) {
      throw new Error(`Schema '${nextStage}' not found in ${schema.title}`);
    }

    const {progress} = nextSchema;
    if (prevStage !== nextStage) {
      showTopbarCenterText(schema[nextStage].pageTitle);
      if (progress) {
        updateProgress(progress);
        if (nextSchema.skippable) {
          this.toggleSkipButton(nextStage);
        } else {
          this.toggleSkipButton(null);
        }
      }
    }
  }

  componentWillUnmount = async () => {
    const {
      clearProgress,
      hideTopbarCenterText,
      updateTheme,
      globaltheme,
    } = this.props;
    const {originaltheme} = this.state;
    if (originaltheme !== globaltheme) {
      updateTheme(originaltheme);
    }
    clearProgress();
    hideTopbarCenterText();
    this.toggleSkipButton(null);
  };

  render() {
    const {
      match: {
        params: {stage},
      },
      schema,
      inviteUser,
      globaltheme,
      components,
    } = this.props;

    return (
      <FormPage
        globaltheme={globaltheme}
        schema={schema[stage]}
        components={components}
        onSubmit={this.handleFormSubmit}
        inviteUser={inviteUser}
        hasErrors={this.errors}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  form: state.form,
  partialForm: state.partialForm,
  globaltheme: props.globaltheme || state.globaltheme,
  skipText:
    state.locale.translations.skip || state.locale.translations.common.skip,
});

const mapDispatchToProps = {
  goTo: location => dispatch => dispatch(go(location)),
  updateProgress: updateProgressAction,
  clearProgress: clearProgressAction,
  updateTopbarButton: updateTopbarButtonAction,
  hideTopbarButton: hideTopbarButtonAction,
  showTopbarButton: showTopbarButtonAction,
  next: nextAction,
  showTopbarCenterText: text => dispatch =>
    dispatch(showTopbarCenterTextAction(text)),
  hideTopbarCenterText: () => dispatch =>
    dispatch(hideTopbarCenterTextAction()),
  updateTheme: updateThemeAction,
};

MultiPageForm.propTypes = {
  form: object,
  partialForm: object,
  schema: shape({
    stage: objectOf(
      shape({
        skippable: bool,
        next: string.isRequired,
        pageTitle: string.isRequired,
        progress: number.isRequired,
      }).isRequired,
    ),
  }),
  skipText: string.isRequired,
  pagetheme: oneOf(["dark", "light"]),
  globaltheme: oneOf(["dark", "light"]).isRequired,
  goTo: func,
  updateProgress: func.isRequired,
  clearProgress: func.isRequired,
  match: shape({
    params: shape({
      stage: string,
    }),
  }),
  next: func.isRequired,
  showTopbarCenterText: func.isRequired,
  hideTopbarCenterText: func.isRequired,
  updateTopbarButton: func.isRequired,
  hideTopbarButton: func.isRequired,
  showTopbarButton: func.isRequired,
  updateTheme: func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiPageForm);
