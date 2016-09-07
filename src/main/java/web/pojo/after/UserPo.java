package web.pojo.after;

import web.pojo.before.User;

/**
 * Created by linyufan on 16/7/22.
 */
public class UserPo {

    public String UserId;
    public String Password;
    public String Head;
    public String Summary;
    public String UserName;
    public String maxearn;

    public String getMaxearn() {
        return maxearn;
    }

    public void setMaxearn(String maxearn) {
        this.maxearn = maxearn;
    }

    public UserPo() {

    }

    public UserPo(String userName, String password) {
        this.UserName = userName;
        this.Password = password;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getHead() {
        return Head;
    }

    public void setHead(String head) {
        Head = head;
    }

    public String getSummary() {
        return Summary;
    }

    public void setSummary(String summary) {
        Summary = summary;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }
}
