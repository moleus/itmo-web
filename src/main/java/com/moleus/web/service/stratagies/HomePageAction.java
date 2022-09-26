package com.moleus.web.service.stratagies;

import com.moleus.web.controller.ServletApplicationContext;
import com.moleus.web.service.exceptions.ActionException;
import com.moleus.web.service.helpers.ViewPath;

public class HomePageAction implements Action {
    @Override
    public ViewPath execute(ServletApplicationContext context) throws ActionException {
//        List<HitResultBean> items = new ArrayList<>();
//        items.add(new HitResultBean(0, 1, 1, 1, true, LocalDateTime.now(), 14));
//        items.add(new HitResultBean(1, 0, 0, 0, false, LocalDateTime.now(), 7));
//        context.getRequest().setAttribute("hitResults", items);
        return ViewPath.HOME;
    }
}
