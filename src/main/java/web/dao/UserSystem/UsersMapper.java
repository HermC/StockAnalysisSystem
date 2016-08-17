package web.dao.UserSystem;

import org.springframework.stereotype.Repository;
import web.pojo.after.UserPo;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/8/16.
 *用户管理
 *
 */
@Repository
public interface UsersMapper {

    public  ArrayList<UserPo>  login(String userID);

    public boolean newUser();

    public boolean updateUser();



}
