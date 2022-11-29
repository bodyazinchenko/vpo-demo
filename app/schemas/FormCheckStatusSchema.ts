import * as Yup from "yup";
import { phone } from 'phone';

// Це костиль для перевірки кастомниї штук, типу phone number. Для інших кейсів дивись доку по Yup https://www.npmjs.com/package/yup#api
Yup.addMethod(Yup.string, 'phone', function(args) {
  return this.test('isPhone', 'Enter valid phone number', function(value) {
      const { isValid } = phone(value as string, { country: 'UA' });
      
      return isValid;
  });
});


const FormCheckStatusSchema = Yup.object({
  phoneNumber: Yup.string().phone().required('Введіть номер телефону'),
  vpoLastFour: Yup.string().matches(/^[0-9]{4}$/, 'Must be exactly 4 digits').required('Введіть останні 4 цифри вашого впо'),
});

export default FormCheckStatusSchema;