package web.impl.stock_presentation;

import org.springframework.stereotype.Service;
import web.dao.stock_presentation.SingleInfoMapper;
import web.pojo.before.SingleInfo;
import web.service.stock_presentation.SingleInfoService;

import javax.annotation.Resource;
import java.util.ArrayList;

/**
 * Created by linyufan on 16/5/27.
 */
@Service("singleInfoImpl")
public class SingleInfoImpl implements SingleInfoService {

    @Resource
    private SingleInfoMapper singleInfoMapper;

    @Override
    public ArrayList<SingleInfo> getSingleInfo() {

        return singleInfoMapper.getSingleInfo();
    }
}
