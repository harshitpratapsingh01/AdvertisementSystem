import { createClient } from "redis";

const client = createClient();
client.connect();

export class Redis {
    static async maintain_session_redis(isUser) {
        client.on('error', err => console.log('Redis client error', err));
        try {
            await client.SET(isUser.username, JSON.stringify({
                user_id: isUser.id,
                status: true
            }));
            const session = await client.get(isUser.username);
            console.log(session);
        }
        catch (err) {
            console.log(err);
        }
    }

    static async logout_session_redis(isUser) {
        client.on('error', err => console.log('Redis client error', err));
        try {
            await client.SET(isUser.username, JSON.stringify({
                user_id: isUser.id,
                status: false
            }));
            const session = await client.get(isUser.username);
            console.log(session);
        }
        catch (err) {
            console.log(err);
        }
    }

    static async isActiv(isUser) {
        if(await client.exists(isUser.username)){
            const session = await client.get(isUser.username);
            const session_data = JSON.parse(session)
            return session_data.status;
        }
        else{
            return false;
        }
    }

    static async save_otp(email,OTP){
        client.on('error', err => console.log('Redis client error', err));
        try{
            await client.setEx(email, 300, JSON.stringify({
                otp : OTP
            }));
            console.log("otp stored successfully");
        }
        catch(err){
            console.log(err);
        }
    }

    static async get_otp(email){
        if(await client.exists(email)){
            const otp_details = await client.get(email);
            const userOTP = JSON.parse(otp_details);
            return userOTP.otp
        }
        else{
            return false;
        }
    }
};
