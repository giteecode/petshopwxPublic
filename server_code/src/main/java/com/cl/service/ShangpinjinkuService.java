package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.ShangpinjinkuEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.ShangpinjinkuView;


/**
 * 商品进库
 *
 * @author 
 * @email 
 * @date 2024-05-10 17:33:33
 */
public interface ShangpinjinkuService extends IService<ShangpinjinkuEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<ShangpinjinkuView> selectListView(Wrapper<ShangpinjinkuEntity> wrapper);
   	
   	ShangpinjinkuView selectView(@Param("ew") Wrapper<ShangpinjinkuEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<ShangpinjinkuEntity> wrapper);
   	

}

