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
    public AddState newUser(UserPo userPo) {
        return null;
    }

    @Override
    public UpdateState updateUser(UserPo userPo) {
        return null;
    }
}
