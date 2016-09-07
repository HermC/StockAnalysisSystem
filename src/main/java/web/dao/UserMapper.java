package web.dao;

import org.springframework.stereotype.Repository;
import web.pojo.before.User;

@Repository
public interface UserMapper {
    int deleteByPrimaryKey(Integer id) ;

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}