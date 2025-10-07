import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendSmsNotification(to,message){
    try {
        await client.messages.create({
            body:message,
            from:process.env.TWILIO_PHONE_NUMBER,
            to: to.startsWith('+')? to : `+91${to}`
        });
        console.log(`SMS sent to ${to}`);
    } catch (error) {
        console.error(`❌ Failed to send SMS to ${to}:`, error.message);

    }
}