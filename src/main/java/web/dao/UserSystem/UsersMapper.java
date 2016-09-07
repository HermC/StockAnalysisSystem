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

    public boolean newUser(UserPo userPo);

    public boolean updateUserPassword(String id ,String value);

    public boolean updateUserHead(String id ,String value);

    public boolean updateUserSummary(String id ,String value);

    public boolean updateUserName(String id ,String value);

    public UserPo getUserByNameAndPassword(UserPo userPo);

    public UserPo getUserByID(String id);

    public ArrayList<UserPo> getAllUser();

}
