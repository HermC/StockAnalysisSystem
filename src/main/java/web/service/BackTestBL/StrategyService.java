package web.service.BackTestBL;

import web.pojo.after.StrategyPo;
import web.pojo.enumPo.AddState;
import web.pojo.enumPo.DeleteState;
import web.pojo.enumPo.UpdateState;

/**
 * Created by linyufan on 16/7/23.
 */
public interface StrategyService {

    public AddState addStrategy(String userid ,String strategyid, String json);

    public UpdateState updateStrategy(String userid ,String strategyid ,String json);

    public DeleteState deleteStrategy(String userid ,String strategyid,String json);

    public StrategyPo selectStrategy(String userid,String Strategyid);

    public void jsonToPython(String json);
}
