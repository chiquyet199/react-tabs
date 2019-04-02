// import React from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { connect } from 'react-redux';
// import { StyleSheet, View, TextInput } from 'react-native';
// import InputField from '../InputField/inputField';
// import Button from '../Button/Button';
//
// const submit = values => {
//
//     console.log('submitting form', values); // eslint-disable-line
// };
//
// // Boilerplate needed for react native as onChange is not already programmed into TextInputs
// // meta data passed down as prop into inputField in order to render error correctly on validate
// const renderInput = ({
//  input: { onChange }, meta: { touched, error }, meta, ...props
// =======
//     console.log('submitting form: ', values);
// };
//
// const renderInput = ({
//  input, input: { onChange }, meta: { touched, error }, meta, ...props
// >>>>>>> :seedling: Created dynamic redux form connected to data from reduxStore
// }) => {
//     const hasError = touched && error !== undefined;
//     return <InputField style={styles.input} onChangeText={onChange} errorText={hasError && error} {...props} />;
// };
//
// const camelToTitle = (camelCase) => camelCase
//     .replace(/([A-Z])/g, (match) => ` ${match}`)
//     .replace(/^./, (match) => match.toUpperCase());
//
// const getFields = (props) => {
//     const { initialValues } = props;
//     return Object.entries(initialValues).map(([key, value], i) => (
//       <Field
//         key={i}
//         name={key}
//         component={renderInput}
//         label={camelToTitle(key)}
//         defaultValue={value}
//       />
//     ));
// };
//
// let TwoFieldForm = props => {
//     const { handleSubmit, initialValues } = props;
//     console.log('Initial Values: ', initialValues);
//     return (
//       <View style={styles.container}>
//         {getFields(props)}
//         <Button style={styles.logOutbutton} text="Submit" onClick={handleSubmit(submit)} textStyle={styles.buttonText} />
//       </View>
//     );
// };
// //
// // const validate = (values) => {
// //     const errors = {};
// //     if (!values.name || values.name.trim() === '') {
// //         errors.name = 'Enter a Name';
// //     }
// //     if (!values.email || values.email.trim() === '') {
// //         errors.email = 'Enter email';
// //     }
// //     return errors;
// // };
//
// <<<<<<< HEAD
// const validate = (values) => {
//     const errors = {};
//     if (!values.name || values.name.trim() === '') {
//         errors.name = 'Enter a Name';
//     }
//     if (!values.email || values.email.trim() === '') {
//         errors.email = 'Enter email';
//     }
//     return errors;
// };
//
// export default reduxForm({
// =======
// TwoFieldForm = reduxForm({
// >>>>>>> :seedling: Created dynamic redux form connected to data from reduxStore
//     form: 'TwoFieldForm',
//     // validate,
// })(TwoFieldForm);
//
// TwoFieldForm = connect(
//     state => ({
//         initialValues: state.formInput.data
//     })
// )(TwoFieldForm);
//
// export default TwoFieldForm;
//
//
// const styles = StyleSheet.create({
//     button: {
//         backgroundColor: 'blue',
//         color: 'white',
//         height: 30,
//         lineHeight: 30,
//         marginTop: 10,
//         textAlign: 'center',
//         width: 250
//     },
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     input: {
//         borderColor: 'black',
//         borderWidth: 1,
//         height: 37,
//         margin: 10
//     },
//     logOutbutton: {
//         width: 340,
//         height: 48,
//         borderRadius: 6,
//         backgroundColor: '#5AB88E',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     buttonText: {
//         color: '#fff',
//     }
// });
