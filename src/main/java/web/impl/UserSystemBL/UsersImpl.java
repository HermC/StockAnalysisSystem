package web.impl.UserSystemBL;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Service;
import web.dao.UserMapper;
import web.dao.UserSystem.UsersMapper;
import web.pojo.after.UserPo;
import web.pojo.enumPo.AddState;
import web.pojo.enumPo.LoginState;
import web.pojo.enumPo.UpdateState;
import web.service.UserSystemBL.UsersService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/8/16.
 */
@Service("usersService")
public class UsersImpl implements UsersService {

    @Resource
    private UsersMapper usersMapper;

    @Override
    public LoginState login(String userID, String password) {
        ArrayList<UserPo> resultlist = usersMapper.login(userID);
//        System.out.println(JSON.toJSON(resultlist.get(0)));
        if (resultlist.size()==1){
//            System.out.println(resultlist.get(0).getPassword() +" " +password);
            if (resultlist.get(0).getPassword().equals( password))
                return LoginState.登陆成功;
            else
                return LoginState.用户名或密码错误;
        }else {
            return LoginState.用户名不存在;
        }
    }

    @Override
    public String newUser(UserPo userPo) {
        usersMapper.newUser(userPo);
        UserPo result = usersMapper.getUserByNameAndPassword(userPo);

        return result.getUserId();

    }

    @Override
    public UpdateState updateUserHead(String userID, String value) {
        usersMapper.updateUserHead(userID, value);
        return UpdateState.修改成功;
    }



    @Override
    public UpdateState updateUserPassword(String userID, String value) {
        usersMapper.updateUserPassword(userID,value);
        return UpdateState.修改成功;
    }

    @Override
    public UpdateState updateUserName(String userID, String value) {
        usersMapper.updateUserName(userID,value);
        return UpdateState.修改成功;
    }

    @Override
    public UpdateState updateUserSummary(String userID, String value) {
        usersMapper.updateUserSummary(userID,value);
        return UpdateState.修改成功;
    }

    @Override
    public UserPo getUser(String userid) {

        return usersMapper.getUserByID(userid);
    }

    @Override
    public ArrayList<UserPo> getAllUser() {
        return usersMapper.getAllUser();
    }

}
