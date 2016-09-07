package web.service.UserSystemBL;

import web.pojo.after.UserPo;
import web.pojo.enumPo.AddState;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.LoginState;
import web.pojo.enumPo.UpdateState;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/7/22.
 */

//用户管理  增删改查

public interface UsersService {

    public LoginState login(String userID, String password );

    public String newUser(UserPo userPo);

    public UpdateState updateUserHead(String userID , String value);


    public UpdateState updateUserPassword(String userID , String value);

    public UpdateState updateUserName(String userID , String value);

    public UpdateState updateUserSummary(String userID , String value);

    public UserPo getUser(String userid);


    public ArrayList<UserPo> getAllUser();
//    public DeleteState deleteUser(UserPo userPo);

}
