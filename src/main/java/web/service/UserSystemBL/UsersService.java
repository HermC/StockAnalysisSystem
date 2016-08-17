package web.service.UserSystemBL;

import web.pojo.after.UserPo;
import web.pojo.enumPo.AddState;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.LoginState;
import web.pojo.enumPo.UpdateState;

/**
 * Created by linyufan on 16/7/22.
 */

//用户管理  增删改查

public interface UsersService {

    public LoginState login(String userID, String password );

    public AddState newUser(UserPo userPo);

    public UpdateState updateUser(UserPo userPo);

//    public DeleteState deleteUser(UserPo userPo);

}
