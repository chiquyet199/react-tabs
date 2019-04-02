import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {
  FlexRow,
  RentPassportListItemContainer,
  RentPassportListBodyContainer,
  RentPassportListItemIcon,
  RentPassportListItemDetails,
  IconWrapper,
  ToggleIcon,
  Title,
  SubTitle,
  ContentDivider,
  ListSpace,
} from "./RentPassportCompleteList.styles";
import RentPassportCollapseContent from "../RentPassportCollapseContent";
import {RentPassportCompleteContentSchema} from "../../schemas/subschemas/RentPassportCompleteContentSchema";
import {Collapse, CollapseContent} from "../../components/Collapse";
import RentPassportHelpers from "../../utils/helpers/rentPassport";
import Icon from "../Icon";
import {
  arrayOf,
  number,
  oneOfType,
  shape,
  string,
  bool,
  object,
} from "prop-types";
import RentPassportSpec from "./RentPassportSpec";

export class RentPassportCompleteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: props.collapsedByDefault,
    };
  }

  onToggle = () => {
    const {isCollapsed} = this.state;
    this.setState({isCollapsed: !isCollapsed});
  };

  getProperContent = (componentName, schema) => {
    const {translations, rentPassport, scaleImages} = this.props;
    const component = rentPassport[componentName];
    const {status, messages} = component;
    let multipleMessages;
    if (messages == null) {
      multipleMessages = RentPassportHelpers.getMultipleStatuses({component});
    }
    if (schema && schema[componentName]) {
      const componentSchemaProperties =
        typeof schema[componentName].properties === "function"
          ? schema[componentName].properties()
          : schema[componentName].properties;

      return (
        <RentPassportCollapseContent
          schema={componentSchemaProperties}
          errorTexts={translations.errors}
          component={componentName}
          status={status}
          messageGroups={messages}
          multipleMessages={multipleMessages}
          scaleImages={scaleImages}
        />
      );
    }

    return null;
  };
  render() {
    const {isCollapsed} = this.state;
    const {
      item,
      translations,
      rentPassport,
      fullWidthContentDivider,
      detailsMargin,
      iconMargin,
    } = this.props;
    const schema = RentPassportCompleteContentSchema(
      item.uiComponent,
      rentPassport,
      translations,
    );

    const {status} = rentPassport[item.uiComponent];

    let statusProps;
    if (status != null) {
      statusProps = RentPassportHelpers.getNotificationType(status);
    } else {
      const statusWeighted = RentPassportHelpers.getStatusFromMultipleStatuses({
        check: rentPassport[item.uiComponent],
      });
      statusProps = RentPassportHelpers.getNotificationType(statusWeighted);
    }

    return (
      <Fragment>
        <Collapse collapsed={this.state.isCollapsed} onToggle={this.onToggle}>
          <CollapseContent hpadding={10} type="header">
            <RentPassportListItemContainer>
              <RentPassportListItemIcon complete source={item.icons.main} />
              <RentPassportListItemDetails
                detailsMargin={detailsMargin}
                iconMargin={iconMargin}
              >
                <FlexRow>
                  <Title complete>{item.title}</Title>
                  <IconWrapper iconMargin={iconMargin}>
                    <Icon
                      name={statusProps.iconName}
                      size={24}
                      color={statusProps.iconColor}
                    />
                  </IconWrapper>
                </FlexRow>
                <FlexRow>
                  <SubTitle ellipsizeMode="tail" complete>
                    {item.infoText}
                  </SubTitle>
                  <ToggleIcon
                    source={
                      isCollapsed ? item.icons.collapsed : item.icons.open
                    }
                  />
                </FlexRow>
              </RentPassportListItemDetails>
            </RentPassportListItemContainer>
          </CollapseContent>
          <CollapseContent hpadding={10} type="body">
            <RentPassportListBodyContainer>
              {this.getProperContent(item.uiComponent, schema)}
            </RentPassportListBodyContainer>
          </CollapseContent>
        </Collapse>
        <ContentDivider fullWidthContentDivider={fullWidthContentDivider} />
      </Fragment>
    );
  }
}

export const RentPassportList = ({
  items,
  translations,
  rentPassport,
  scaleImages,
  fullWidthContentDivider,
  detailsMargin,
  iconMargin,
  collapsedByDefault,
}) => (
  <ListSpace>
    {items.map(item => (
      <RentPassportCompleteList
        key={item.title}
        item={item}
        translations={translations}
        rentPassport={rentPassport}
        scaleImages={scaleImages}
        fullWidthContentDivider={fullWidthContentDivider}
        detailsMargin={detailsMargin}
        iconMargin={iconMargin}
        collapsedByDefault={collapsedByDefault}
      />
    ))}
  </ListSpace>
);

const mapStateToProps = (state, props) => ({
  translations: {
    ...state.locale.translations.common.rent_passport_complete,
    currency_symbol: state.locale.translations.common.currency_symbol,
  },
  rentPassport: props.rentPassport || state.rentPassport,
});

RentPassportCompleteList.propTypes = {
  item: object.isRequired,
  translations: object.isRequired,
  rentPassport: RentPassportSpec,
  scaleImages: object.isRequired,
  collapsedByDefault: bool,
};

RentPassportCompleteList.defaultProps = {
  collapsedByDefault: true,
};

RentPassportList.propTypes = {
  translations: shape({
    errors: shape({
      unverified: shape({
        text: string,
        action: string,
      }),
    }),
  }).isRequired,
  items: arrayOf(
    shape({
      title: string.isRequired,
      infoText: string.isRequired,
      icons: shape({
        main: oneOfType([number.isRequired, string.isRequired]),
        complete: string.isRequired,
        incomplete: string.isRequired,
        collapsed: oneOfType([number.isRequired, string.isRequired]),
        open: oneOfType([number.isRequired, string.isRequired]),
      }),
      statusText: shape({
        complete: string.isRequired,
        incomplete: string.isRequired,
      }),
      uiComponent: string.isRequired,
    }),
  ),
  scaleImages: shape({
    EXCELLENT: oneOfType([string, number]),
    FAIR: oneOfType([string, number]),
    GOOD: oneOfType([string, number]),
    POOR: oneOfType([string, number]),
    VERY_POOR: oneOfType([string, number]),
  }),
  rentPassport: RentPassportSpec,
  fullWidthContentDivider: bool,
  detailsMargin: number,
  iconMargin: number,
  collapsedByDefault: bool,
};

export default connect(mapStateToProps)(RentPassportList);
