import axios from 'axios'
const SERVICE_ID = 'service_ms1do2o';
const TEMPLATE_ID = 'template_eg68hld';
const USER_ID = 'user_XcjLzZCx3BkTthMKGs7fl';
const DEFAULT_USERNAME = 'PowerPac  Myanmar';


export default {
    sendEmail(payload) {
        const { sendToEmail, message, to_name } = payload
        var data = {
            service_id: SERVICE_ID,
            template_id: TEMPLATE_ID,
            user_id: USER_ID,
            template_params: {
                'to_name': to_name,
                'user_name': DEFAULT_USERNAME,
                'user_email': sendToEmail,
                'message': message
            }
        };

        return axios({
            method: 'post',
            url: 'https://api.emailjs.com/api/v1.0/email/send',
            data: data
        });



    }
}