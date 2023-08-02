import Session from "../models/schema.session";
import { Auth } from "../middleware/Auth.user";
import { RedisSession } from "../middleware/redis.session";

export class Sessions {
    static async maintain_session(isUser) {
        try {
            const user = isUser.id;
            const isSession = await Session.findOne({ where: { userId: user } })
            console.log(isSession);
            if (!isSession) {
                const session_details = {
                    userId: user,
                    status: true
                };
                const session = await Session.create(session_details);
                console.log("Session stored successfully");
                console.log(session);
            }
            else {
                if (!isSession.status) {
                    await Session.update({ status: !isSession.status }, { where: { userId: user } });
                    console.log("Session Activate");
                }
                else{
                    console.log("Session is already Active");
                }
            }
            await RedisSession.maintain_session_redis(isUser);
        }
        catch (err) {
            console.log("Server Error")
        }
    }
}