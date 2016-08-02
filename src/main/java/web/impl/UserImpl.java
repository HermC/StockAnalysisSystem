package web.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.dao.UserMapper;
import web.pojo.before.User;
import web.service.UserService;

/**
 * Created by yqq on 2016.5.2.
 */

@Service("userService")
public class UserImpl implements UserService{
    @Autowired
    private UserMapper userDao;

    @Override
    public User getUserById(int userId) {
        // TODO Auto-generated method stub
        return this.userDao.selectByPrimaryKey(userId);
    }
}
