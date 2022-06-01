const links = [
  {
      "source": "蓝矩阵",
      "target": "宇宙矩阵"
  },
  {
      "source": "红矩阵",
      "target": "宇宙矩阵"
  },
  {
      "source": "黄矩阵",
      "target": "宇宙矩阵"
  },
  {
      "source": "紫矩阵",
      "target": "宇宙矩阵"
  },
  {
      "source": "绿矩阵",
      "target": "宇宙矩阵"
  },
  {
      "source": "反物质",
      "target": "宇宙矩阵"
  },
  {
      "source": "石矿",
      "target": "硅石"
  },
  {
      "source": "蓄电池",
      "target": "蓄电池满"
  },
  {
      "source": "磁线圈",
      "target": "蓝矩阵"
  },
  {
      "source": "电路板",
      "target": "蓝矩阵"
  },
  {
      "source": "高级石墨",
      "target": "红矩阵"
  },
  {
      "source": "氢",
      "target": "红矩阵"
  },
  {
      "source": "金刚石",
      "target": "黄矩阵"
  },
  {
      "source": "钛晶石",
      "target": "黄矩阵"
  },
  {
      "source": "处理器",
      "target": "紫矩阵"
  },
  {
      "source": "粒子带宽",
      "target": "紫矩阵"
  },
  {
      "source": "量子芯片",
      "target": "绿矩阵"
  },
  {
      "source": "引力透镜",
      "target": "绿矩阵"
  },
  {
      "source": "绿矩阵",
      "target": "空间翘曲器"
  },
  {
      "source": "引力透镜",
      "target": "空间翘曲器"
  },
  {
      "source": "钛合金",
      "target": "氘核燃料棒"
  },
  {
      "source": "重氢",
      "target": "氘核燃料棒"
  },
  {
      "source": "超级磁场环",
      "target": "氘核燃料棒"
  },
  {
      "source": "金刚石",
      "target": "引力透镜"
  },
  {
      "source": "奇异物质",
      "target": "引力透镜"
  },
  {
      "source": "铁矿",
      "target": "铁块"
  },
  {
      "source": "铁块",
      "target": "钢材"
  },
  {
      "source": "钛石",
      "target": "钛块"
  },
  {
      "source": "铜矿",
      "target": "铜块"
  },
  {
      "source": "铁矿",
      "target": "磁铁"
  },
  {
      "source": "磁铁",
      "target": "磁线圈"
  },
  {
      "source": "铜块",
      "target": "磁线圈"
  },
  {
      "source": "铁块",
      "target": "电路板"
  },
  {
      "source": "铜块",
      "target": "电路板"
  },
  {
      "source": "铁块",
      "target": "齿轮"
  },
  {
      "source": "煤矿",
      "target": "高级石墨"
  },
  {
      "source": "氢",
      "target": "氢"
  },
  {
      "source": "精炼油",
      "target": "氢"
  },
  {
      "source": "氢",
      "target": "高级石墨"
  },
  {
      "source": "精炼油",
      "target": "高级石墨"
  },
  {
      "source": "氢",
      "target": "重氢"
  },
  {
      "source": "氢",
      "target": "重氢"
  },
  {
      "source": "氢",
      "target": "氢"
  },
  {
      "source": "原油",
      "target": "氢"
  },
  {
      "source": "原油",
      "target": "精炼油"
  },
  {
      "source": "可燃冰",
      "target": "氢"
  },
  {
      "source": "可燃冰",
      "target": "石墨烯"
  },
  {
      "source": "临界光子",
      "target": "反物质"
  },
  {
      "source": "临界光子",
      "target": "氢"
  },
  {
      "source": "氢",
      "target": "氢"
  },
  {
      "source": "精炼油",
      "target": "氢"
  },
  {
      "source": "氢",
      "target": "高级石墨"
  },
  {
      "source": "精炼油",
      "target": "高级石墨"
  },
  {
      "source": "氢",
      "target": "重氢"
  },
  {
      "source": "氢",
      "target": "氢"
  },
  {
      "source": "原油",
      "target": "氢"
  },
  {
      "source": "原油",
      "target": "精炼油"
  },
  {
      "source": "可燃冰",
      "target": "氢"
  },
  {
      "source": "可燃冰",
      "target": "石墨烯"
  },
  {
      "source": "硫酸",
      "target": "石墨烯"
  },
  {
      "source": "高级石墨",
      "target": "石墨烯"
  },
  {
      "source": "石矿",
      "target": "玻璃"
  },
  {
      "source": "玻璃",
      "target": "棱镜"
  },
  {
      "source": "硅石",
      "target": "高纯硅块"
  },
  {
      "source": "高纯硅块",
      "target": "微晶元件"
  },
  {
      "source": "铜块",
      "target": "微晶元件"
  },
  {
      "source": "电路板",
      "target": "处理器"
  },
  {
      "source": "微晶元件",
      "target": "处理器"
  },
  {
      "source": "高级石墨",
      "target": "金刚石"
  },
  {
      "source": "金伯利矿石",
      "target": "金刚石"
  },
  {
      "source": "精炼油",
      "target": "塑料"
  },
  {
      "source": "高级石墨",
      "target": "塑料"
  },
  {
      "source": "塑料",
      "target": "有机晶体"
  },
  {
      "source": "精炼油",
      "target": "有机晶体"
  },
  {
      "source": "水",
      "target": "有机晶体"
  },
  {
      "source": "有机晶体",
      "target": "钛晶石"
  },
  {
      "source": "钛块",
      "target": "钛晶石"
  },
  {
      "source": "高纯硅块",
      "target": "晶格硅"
  },
  {
      "source": "分形硅石",
      "target": "晶格硅"
  },
  {
      "source": "石矿",
      "target": "石材"
  },
  {
      "source": "铁块",
      "target": "电动机"
  },
  {
      "source": "齿轮",
      "target": "电动机"
  },
  {
      "source": "磁线圈",
      "target": "电动机"
  },
  {
      "source": "电动机",
      "target": "电磁涡轮"
  },
  {
      "source": "磁线圈",
      "target": "电磁涡轮"
  },
  {
      "source": "精炼油",
      "target": "硫酸"
  },
  {
      "source": "石矿",
      "target": "硫酸"
  },
  {
      "source": "水",
      "target": "硫酸"
  },
  {
      "source": "石墨烯",
      "target": "碳纳米管"
  },
  {
      "source": "钛块",
      "target": "碳纳米管"
  },
  {
      "source": "刺笋结晶",
      "target": "碳纳米管"
  },
  {
      "source": "碳纳米管",
      "target": "粒子带宽"
  },
  {
      "source": "晶格硅",
      "target": "粒子带宽"
  },
  {
      "source": "塑料",
      "target": "粒子带宽"
  },
  {
      "source": "玻璃",
      "target": "钛化玻璃"
  },
  {
      "source": "钛块",
      "target": "钛化玻璃"
  },
  {
      "source": "水",
      "target": "钛化玻璃"
  },
  {
      "source": "钛晶石",
      "target": "卡西米尔晶体"
  },
  {
      "source": "石墨烯",
      "target": "卡西米尔晶体"
  },
  {
      "source": "氢",
      "target": "卡西米尔晶体"
  },
  {
      "source": "光栅石",
      "target": "卡西米尔晶体"
  },
  {
      "source": "石墨烯",
      "target": "卡西米尔晶体"
  },
  {
      "source": "氢",
      "target": "卡西米尔晶体"
  },
  {
      "source": "卡西米尔晶体",
      "target": "位面过滤器"
  },
  {
      "source": "钛化玻璃",
      "target": "位面过滤器"
  },
  {
      "source": "处理器",
      "target": "量子芯片"
  },
  {
      "source": "位面过滤器",
      "target": "量子芯片"
  },
  {
      "source": "电磁涡轮",
      "target": "粒子容器"
  },
  {
      "source": "铜块",
      "target": "粒子容器"
  },
  {
      "source": "石墨烯",
      "target": "粒子容器"
  },
  {
      "source": "单极磁石",
      "target": "粒子容器"
  },
  {
      "source": "铜块",
      "target": "粒子容器"
  },
  {
      "source": "粒子容器",
      "target": "奇异物质"
  },
  {
      "source": "铁块",
      "target": "奇异物质"
  },
  {
      "source": "重氢",
      "target": "奇异物质"
  },
  {
      "source": "引力透镜",
      "target": "临界光子"
  },
  {
      "source": "临界光子",
      "target": "反物质"
  },
  {
      "source": "临界光子",
      "target": "氢"
  },
  {
      "source": "电磁涡轮",
      "target": "超级磁场环"
  },
  {
      "source": "磁铁",
      "target": "超级磁场环"
  },
  {
      "source": "高级石墨",
      "target": "超级磁场环"
  },
  {
      "source": "钛块",
      "target": "钛合金"
  },
  {
      "source": "钢材",
      "target": "钛合金"
  },
  {
      "source": "硫酸",
      "target": "钛合金"
  },
  {
      "source": "磁线圈",
      "target": "电浆激发器"
  },
  {
      "source": "棱镜",
      "target": "电浆激发器"
  },
  {
      "source": "碳纳米管",
      "target": "框架材料"
  },
  {
      "source": "钛合金",
      "target": "框架材料"
  },
  {
      "source": "高纯硅块",
      "target": "框架材料"
  },
  {
      "source": "棱镜",
      "target": "光子合并器"
  },
  {
      "source": "电路板",
      "target": "光子合并器"
  },
  {
      "source": "光栅石",
      "target": "光子合并器"
  },
  {
      "source": "电路板",
      "target": "光子合并器"
  },
  {
      "source": "石墨烯",
      "target": "太阳帆"
  },
  {
      "source": "光子合并器",
      "target": "太阳帆"
  },
  {
      "source": "框架材料",
      "target": "戴森球组件"
  },
  {
      "source": "太阳帆",
      "target": "戴森球组件"
  },
  {
      "source": "处理器",
      "target": "戴森球组件"
  },
  {
      "source": "戴森球组件",
      "target": "小型运载火箭"
  },
  {
      "source": "氘核燃料棒",
      "target": "小型运载火箭"
  },
  {
      "source": "量子芯片",
      "target": "小型运载火箭"
  },
  {
      "source": "石材",
      "target": "地基"
  },
  {
      "source": "钢材",
      "target": "地基"
  },
  {
      "source": "钛块",
      "target": "液氢燃料棒"
  },
  {
      "source": "氢",
      "target": "液氢燃料棒"
  },
  {
      "source": "铁块",
      "target": "电力感应塔"
  },
  {
      "source": "磁线圈",
      "target": "电力感应塔"
  },
  {
      "source": "电力感应塔",
      "target": "无线输电塔"
  },
  {
      "source": "电浆激发器",
      "target": "无线输电塔"
  },
  {
      "source": "无线输电塔",
      "target": "卫星配电站"
  },
  {
      "source": "超级磁场环",
      "target": "卫星配电站"
  },
  {
      "source": "框架材料",
      "target": "卫星配电站"
  },
  {
      "source": "铁块",
      "target": "风力涡轮机"
  },
  {
      "source": "齿轮",
      "target": "风力涡轮机"
  },
  {
      "source": "磁线圈",
      "target": "风力涡轮机"
  },
  {
      "source": "铁块",
      "target": "火力发电机"
  },
  {
      "source": "石材",
      "target": "火力发电机"
  },
  {
      "source": "齿轮",
      "target": "火力发电机"
  },
  {
      "source": "磁线圈",
      "target": "火力发电机"
  },
  {
      "source": "铁块",
      "target": "传送带"
  },
  {
      "source": "齿轮",
      "target": "传送带"
  },
  {
      "source": "传送带",
      "target": "高速传送带"
  },
  {
      "source": "电磁涡轮",
      "target": "高速传送带"
  },
  {
      "source": "高速传送带",
      "target": "极速传送带"
  },
  {
      "source": "超级磁场环",
      "target": "极速传送带"
  },
  {
      "source": "石墨烯",
      "target": "极速传送带"
  },
  {
      "source": "铁块",
      "target": "小型储物仓"
  },
  {
      "source": "石材",
      "target": "小型储物仓"
  },
  {
      "source": "钢材",
      "target": "大型储物仓"
  },
  {
      "source": "石材",
      "target": "大型储物仓"
  },
  {
      "source": "高纯硅块",
      "target": "太阳能板"
  },
  {
      "source": "铜块",
      "target": "太阳能板"
  },
  {
      "source": "电路板",
      "target": "太阳能板"
  },
  {
      "source": "铁块",
      "target": "蓄电池"
  },
  {
      "source": "超级磁场环",
      "target": "蓄电池"
  },
  {
      "source": "晶格硅",
      "target": "蓄电池"
  },
  {
      "source": "钢材",
      "target": "射线接收站"
  },
  {
      "source": "高纯硅块",
      "target": "射线接收站"
  },
  {
      "source": "光子合并器",
      "target": "射线接收站"
  },
  {
      "source": "处理器",
      "target": "射线接收站"
  },
  {
      "source": "超级磁场环",
      "target": "射线接收站"
  },
  {
      "source": "钛合金",
      "target": "微型聚变发电站"
  },
  {
      "source": "超级磁场环",
      "target": "微型聚变发电站"
  },
  {
      "source": "碳纳米管",
      "target": "微型聚变发电站"
  },
  {
      "source": "处理器",
      "target": "微型聚变发电站"
  },
  {
      "source": "钢材",
      "target": "能量枢纽"
  },
  {
      "source": "钛合金",
      "target": "能量枢纽"
  },
  {
      "source": "处理器",
      "target": "能量枢纽"
  },
  {
      "source": "粒子容器",
      "target": "能量枢纽"
  },
  {
      "source": "铁块",
      "target": "储液灌"
  },
  {
      "source": "石材",
      "target": "储液灌"
  },
  {
      "source": "玻璃",
      "target": "储液灌"
  },
  {
      "source": "铁块",
      "target": "分拣器"
  },
  {
      "source": "电路板",
      "target": "分拣器"
  },
  {
      "source": "分拣器",
      "target": "高速分拣器"
  },
  {
      "source": "电动机",
      "target": "高速分拣器"
  },
  {
      "source": "高速分拣器",
      "target": "极速分拣器"
  },
  {
      "source": "电磁涡轮",
      "target": "极速分拣器"
  },
  {
      "source": "钢材",
      "target": "自动集装机"
  },
  {
      "source": "齿轮",
      "target": "自动集装机"
  },
  {
      "source": "超级磁场环",
      "target": "自动集装机"
  },
  {
      "source": "处理器",
      "target": "自动集装机"
  },
  {
      "source": "钛合金",
      "target": "大型采矿机"
  },
  {
      "source": "框架材料",
      "target": "大型采矿机"
  },
  {
      "source": "超级磁场环",
      "target": "大型采矿机"
  },
  {
      "source": "量子芯片",
      "target": "大型采矿机"
  },
  {
      "source": "光栅石",
      "target": "大型采矿机"
  },
  {
      "source": "钢材",
      "target": "地热发电站"
  },
  {
      "source": "铜块",
      "target": "地热发电站"
  },
  {
      "source": "光子合并器",
      "target": "地热发电站"
  },
  {
      "source": "超级磁场环",
      "target": "地热发电站"
  },
  {
      "source": "铁块",
      "target": "采矿机"
  },
  {
      "source": "电路板",
      "target": "采矿机"
  },
  {
      "source": "磁线圈",
      "target": "采矿机"
  },
  {
      "source": "齿轮",
      "target": "采矿机"
  },
  {
      "source": "钢材",
      "target": "喷涂机"
  },
  {
      "source": "电浆激发器",
      "target": "喷涂机"
  },
  {
      "source": "电路板",
      "target": "喷涂机"
  },
  {
      "source": "微晶元件",
      "target": "喷涂机"
  },
  {
      "source": "铁块",
      "target": "抽水机"
  },
  {
      "source": "石材",
      "target": "抽水机"
  },
  {
      "source": "电动机",
      "target": "抽水机"
  },
  {
      "source": "电路板",
      "target": "抽水机"
  },
  {
      "source": "钢材",
      "target": "原油萃取站"
  },
  {
      "source": "石材",
      "target": "原油萃取站"
  },
  {
      "source": "电路板",
      "target": "原油萃取站"
  },
  {
      "source": "电浆激发器",
      "target": "原油萃取站"
  },
  {
      "source": "钢材",
      "target": "原油精炼厂"
  },
  {
      "source": "石材",
      "target": "原油精炼厂"
  },
  {
      "source": "电路板",
      "target": "原油精炼厂"
  },
  {
      "source": "电浆激发器",
      "target": "原油精炼厂"
  },
  {
      "source": "钛合金",
      "target": "垂直发射井"
  },
  {
      "source": "框架材料",
      "target": "垂直发射井"
  },
  {
      "source": "引力透镜",
      "target": "垂直发射井"
  },
  {
      "source": "量子芯片",
      "target": "垂直发射井"
  },
  {
      "source": "铁块",
      "target": "四向分流器"
  },
  {
      "source": "齿轮",
      "target": "四向分流器"
  },
  {
      "source": "电路板",
      "target": "四向分流器"
  },
  {
      "source": "铁块",
      "target": "制作台Mk.Ⅰ"
  },
  {
      "source": "齿轮",
      "target": "制作台Mk.Ⅰ"
  },
  {
      "source": "电路板",
      "target": "制作台Mk.Ⅰ"
  },
  {
      "source": "制作台Mk.Ⅰ",
      "target": "制作台Mk.Ⅱ"
  },
  {
      "source": "石墨烯",
      "target": "制作台Mk.Ⅱ"
  },
  {
      "source": "处理器",
      "target": "制作台Mk.Ⅱ"
  },
  {
      "source": "制作台Mk.Ⅱ",
      "target": "制作台Mk.Ⅲ"
  },
  {
      "source": "粒子带宽",
      "target": "制作台Mk.Ⅲ"
  },
  {
      "source": "量子芯片",
      "target": "制作台Mk.Ⅲ"
  },
  {
      "source": "制作台Mk.Ⅱ",
      "target": "制作台Mk.Ⅲ"
  },
  {
      "source": "粒子带宽",
      "target": "制作台Mk.Ⅲ"
  },
  {
      "source": "量子芯片",
      "target": "制作台Mk.Ⅲ"
  },
  {
      "source": "铁块",
      "target": "电弧熔炉"
  },
  {
      "source": "石材",
      "target": "电弧熔炉"
  },
  {
      "source": "电路板",
      "target": "电弧熔炉"
  },
  {
      "source": "磁线圈",
      "target": "电弧熔炉"
  },
  {
      "source": "钢材",
      "target": "分馏塔"
  },
  {
      "source": "石材",
      "target": "分馏塔"
  },
  {
      "source": "玻璃",
      "target": "分馏塔"
  },
  {
      "source": "处理器",
      "target": "分馏塔"
  },
  {
      "source": "钢材",
      "target": "化工厂"
  },
  {
      "source": "石材",
      "target": "化工厂"
  },
  {
      "source": "玻璃",
      "target": "化工厂"
  },
  {
      "source": "电路板",
      "target": "化工厂"
  },
  {
      "source": "铁块",
      "target": "矩阵研究站"
  },
  {
      "source": "玻璃",
      "target": "矩阵研究站"
  },
  {
      "source": "电路板",
      "target": "矩阵研究站"
  },
  {
      "source": "磁线圈",
      "target": "矩阵研究站"
  },
  {
      "source": "钢材",
      "target": "电磁轨道弹射器"
  },
  {
      "source": "齿轮",
      "target": "电磁轨道弹射器"
  },
  {
      "source": "处理器",
      "target": "电磁轨道弹射器"
  },
  {
      "source": "超级磁场环",
      "target": "电磁轨道弹射器"
  },
  {
      "source": "钢材",
      "target": "行星内物流运输站"
  },
  {
      "source": "钛块",
      "target": "行星内物流运输站"
  },
  {
      "source": "处理器",
      "target": "行星内物流运输站"
  },
  {
      "source": "粒子容器",
      "target": "行星内物流运输站"
  },
  {
      "source": "钛合金",
      "target": "微型微型粒子对撞机"
  },
  {
      "source": "框架材料",
      "target": "微型微型粒子对撞机"
  },
  {
      "source": "超级磁场环",
      "target": "微型微型粒子对撞机"
  },
  {
      "source": "石墨烯",
      "target": "微型微型粒子对撞机"
  },
  {
      "source": "处理器",
      "target": "微型微型粒子对撞机"
  },
  {
      "source": "行星内物流运输站",
      "target": "星际物流运输站"
  },
  {
      "source": "钛合金",
      "target": "星际物流运输站"
  },
  {
      "source": "粒子容器",
      "target": "星际物流运输站"
  },
  {
      "source": "钛合金",
      "target": "加力推进器"
  },
  {
      "source": "电磁涡轮",
      "target": "加力推进器"
  },
  {
      "source": "星际物流运输站",
      "target": "轨道采集器"
  },
  {
      "source": "超级磁场环",
      "target": "轨道采集器"
  },
  {
      "source": "加力推进器",
      "target": "轨道采集器"
  },
  {
      "source": "蓄电池满",
      "target": "轨道采集器"
  },
  {
      "source": "钢材",
      "target": "推进器"
  },
  {
      "source": "铜块",
      "target": "推进器"
  },
  {
      "source": "铁块",
      "target": "物流运输机"
  },
  {
      "source": "处理器",
      "target": "物流运输机"
  },
  {
      "source": "推进器",
      "target": "物流运输机"
  },
  {
      "source": "钛合金",
      "target": "星际物流运输机"
  },
  {
      "source": "处理器",
      "target": "星际物流运输机"
  },
  {
      "source": "加力推进器",
      "target": "星际物流运输机"
  },
  {
      "source": "粒子容器",
      "target": "湮灭约束球"
  },
  {
      "source": "处理器",
      "target": "湮灭约束球"
  },
  {
      "source": "反物质",
      "target": "反物质燃料棒"
  },
  {
      "source": "氢",
      "target": "反物质燃料棒"
  },
  {
      "source": "湮灭约束球",
      "target": "反物质燃料棒"
  },
  {
      "source": "钛合金",
      "target": "反物质燃料棒"
  },
  {
      "source": "钛合金",
      "target": "人造恒星"
  },
  {
      "source": "框架材料",
      "target": "人造恒星"
  },
  {
      "source": "湮灭约束球",
      "target": "人造恒星"
  },
  {
      "source": "量子芯片",
      "target": "人造恒星"
  },
  {
      "source": "电弧熔炉",
      "target": "位面熔炉"
  },
  {
      "source": "框架材料",
      "target": "位面熔炉"
  },
  {
      "source": "位面过滤器",
      "target": "位面熔炉"
  },
  {
      "source": "单极磁石",
      "target": "位面熔炉"
  },
  {
      "source": "铁块",
      "target": "流速检测器"
  },
  {
      "source": "齿轮",
      "target": "流速检测器"
  },
  {
      "source": "玻璃",
      "target": "流速检测器"
  },
  {
      "source": "电路板",
      "target": "流速检测器"
  },
  {
      "source": "煤矿",
      "target": "增产剂Mk.Ⅰ"
  },
  {
      "source": "增产剂Mk.Ⅰ",
      "target": "增产剂Mk.Ⅱ"
  },
  {
      "source": "金刚石",
      "target": "增产剂Mk.Ⅱ"
  },
  {
      "source": "增产剂Mk.Ⅱ",
      "target": "增产剂Mk.Ⅲ"
  },
  {
      "source": "碳纳米管",
      "target": "增产剂Mk.Ⅲ"
  }
]