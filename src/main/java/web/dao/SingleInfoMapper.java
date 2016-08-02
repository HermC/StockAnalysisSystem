package web.dao;

import org.springframework.stereotype.Repository;
import web.pojo.before.SingleInfo;

import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/27.
 */
@Repository
public interface SingleInfoMapper {

    public ArrayList<SingleInfo> getSingleInfo();

    public ArrayList<String> getList();
}
