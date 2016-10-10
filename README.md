# Ascending
**Ascending**致力于打造**简单、高效**的股票分析软件。你可以在这里找到完整的股票信息，查看基于MACD、RSI、KDJ、BOLL线的分析，以及基于SVM模型和BP神经网络的股票预测。在此之上，你可以打造**自己的**股票买卖策略。我们提供平台让你测试自己策略的收益。

![Index Screenshot](http://115.159.46.93:8888/Ascending/resources/img/cut/index-cut.png)

<br>
###多平台支持
为了方便各个平台的用户，我们利用electron开发了windows、macOS、linux上的应用程序，你可以通过上面的**Ascending-darwin-x64.zip**, **Ascending-linux-x64.zip**以及**Ascending-win32-x64.zip**下载。<br>
同时，我们的web版提供更为高效的访问和操作支持。

<br>

# API文档

## 简介

感谢您使用Ascending股票平台的量化交易模块，以下内容主要介绍聚量化交易模块的API使用方法。

如果以下内容仍没有解决您的问题，请您通过联系开发者的方式告诉我们，谢谢！




## Python SDK 简介

### Python策略Hello World

以下的策略是最简单的一个买入并持有平安银行（buy and hold）的展示，非常简单：

```python
# 可以自己import我们平台支持的第三方python模块，比如pandas、numpy等。

# 在这个方法中编写任何的初始化逻辑。context对象将会在你的算法策略的任何方法之间做传递。
def init(context):
    context.s1 = "000001.XSHE"
    # order是否被发送出去
    context.fired = False

# 你选择的证券的数据更新将会触发此段逻辑，例如日或分钟历史数据切片或者是实时数据切片更新
def handle_bar(context, bar_dict):
    # 开始编写你的主要的算法逻辑

    # bar_dict[order_book_id] 可以拿到某个证券的bar信息
    # context.portfolio 可以拿到现在的投资组合状态信息

    # 使用order_shares(id_or_ins, amount)方法进行落单

    # TODO: 开始编写你的算法吧！
    if not context.fired:
	    # order_percent并且传入1代表买入该股票并且使其占有投资组合的100%
        order_percent(context.s1, 1)
        context.fired = True
```

----

### 需要实现的方法

你的算法策略目前必须实现至少两个方法：`init` 和 `handle_bar`，而`before_trading`是可选择实现的方法。

#### init

```python
init(context)
```

初始化方法 - 在回测和实时模拟交易只会在启动的时候触发一次。你的算法会使用这个方法来设置你需要的各种初始化配置。
`context` 对象将会在你的算法的所有其他的方法之间进行传递以方便你可以拿取到。
特别注意，在初始化股票池的时候，必须使用如下样式

```python
init(context):
    context.s1 = '600000.XSHG'
    context.s2 = '600004.XSHG'
    ....
        context.stocks = [context.s1]
    
    #如果仅有一条股票也需要如此

```


| 参数 | 类型 | 注释 |
| --- | --- | --- |
| context | python简单对象 | 将会在整个算法中当做一个全局变量来使用。属性通过点标记（"."）来取到。 |

**返回**
None

**范例:**

```python
def init(context):
	# cash_limit的属性是根据用户需求自己定义的，你可以定义无限多种自己随后需要的属性，ricequant的系统默认只是会占用context.portfolio的关键字来调用策略的投资组合信息
	context.cash_limit = 5000
```

#### handle_bar

```python
handle_bar(context, bar_dict)
```

切片数据的更新会自动触发调用这个方法，如果是日回测则是每日的切片数据（OHLC）会触发调用，分钟回测则会是每分钟的切片数据会调用，那么在实时模拟交易中则是实时每分钟会调用一次。对于切片数据对象你可以看关于[Bar对象](#bar-object)的更详细的信息。

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| context | 和init方法中的context对象一样 | 存储所有策略的自己定义的变量状态或是初始设置。|
| bar_dict | bar dictionary - 存储了关注的证券的bar的一个dict，order_book_id作为key | 所有已‘关注’的股票的切片数据信息都会更新在这个dict里面。 |

**返回**
None

**范例**

```python
def handle_bar(context, bar_dict):
	# put all your algorithm main logic here.
	# ...
	order_shares('000001.XSHE', 500)
	# ...
```

#### before_trading

非强制，可选择实现的函数。每天在市场开始前会被调用。**不可以在这个函数中发送订单（即不可以调用`order_xxxx`函数）。**

```python
before_trading(context, bar_dict)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| context | 和init方法中的context对象一样 | 存储所有策略的自己定义的变量状态或是初始设置，也保存了`portfolio`的信息。 |

**返回**
None

**范例**
```python
def before_trading(context, bar_dict):
    context.stock_list = ["000001.XSHE", "000099.XSHE"]

    # 手动更新股票池
    update_universe(context.stock_list)
```

----

### Order方法

你可以在策略中使用下面的几种丰富的落单方法，他们不同的用法可以让你落单的操作十分便捷。我们在交易系统内部提供好了仓位计算，因此你可以非常便利使用一些基于仓位管理上的落单方法，比如`order_percent` 可以让你基于目前的仓位价值进行落单。

#### order_shares

落指定**股数**的买/卖单，最常见的落单方式之一。如有需要落单类型当做一个参量传入，如果忽略掉落单类型，那么默认是市价单（market order）。

```python
order_shares(id_or_ins, amount, style=MarketOrder())
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| id_or_ins | str或instrument对象-required | order_book_id或symbol或instrument对象 |
| amount | float-required | 需要落单的股数。正数代表买入，负数代表卖出。将会根据一手xx股来向下调整到一手的倍数，比如中国A股就是调整成100股的倍数。 |
| style | OrderType-optional | 订单类型，默认是市价单。目前支持的订单类型有：<ul><li>style=MarketOrder()</li><li>style=LimitOrder(<span></span>limit_price)</li></ul> |

**返回**
int，唯一的order id

**范例**

- 购买Buy 2000 股的平安银行股票，并以市价单发送

```python
order_shares('000001.XSHE', 2000)
```

- 卖出2000股的平安银行股票，并以市价单发送：

```python
order_shares('000001.XSHE', -2000)
```

- 购买1000股的平安银行股票，并以限价单发送，价格为￥10：

```python
order_shares('000001.XSHG', 1000, style=LimitOrder(10))
```

#### order_lots

指定手数发送买/卖单。如有需要落单类型当做一个参量传入，如果忽略掉落单类型，那么默认是市价单（market order）。

```python
order_lots(id_or_ins, amount, style=OrderType)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| id_or_ins | str或instrument对象-required | order_book_id或symbol或instrument对象 |
| amount | float-required | 多少手的数目。正数表示买入，负数表示卖出 |
| style | OrderType-optional | 订单类型，默认是市价单。目前支持的订单类型有：<ul><li>style=MarketOrder</li><li>style=LimitOrder(<span></span>limit_price)</li></ul> |

**返回**
int，唯一的order id

**范例**

- 买入20手的平安银行股票，并且发送市价单：

```python
order_lots('000001.XSHE', 20)
```

- 买入10手平安银行股票，并且发送限价单，价格为￥10：

```python
order_lots('000001.XSHE', 10, style=LimitOrder(10))
```

#### order_value

使用想要花费的金钱买入/卖出股票，而不是买入/卖出想要的股数，正数代表买入，负数代表卖出。股票的股数总是会被调整成对应的100的倍数（在A中国A股市场1手是100股）。当您提交一个卖单时，该方法代表的意义是您希望通过卖出该股票套现的金额。如果金额超出了您所持有股票的价值，那么您将卖出所有股票。

```python
order_value(id_or_ins, cash_amount, style=OrderType)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| id_or_ins | str或instrument对象-required | order_book_id或symbol或instrument对象 |
| cash_amount | float-required | 需要花费现金购买/卖出证券的数目。正数代表买入，负数代表卖出。 |
| style | OrderType-optional | 订单类型，默认是市价单。目前支持的订单类型有：<ul><li>style=MarketOrder()</li><li>style=LimitOrder(<span></span>limit_price)</li></ul> |

**返回**
int，唯一的order id

**范例**

- 买入价值￥10000的平安银行股票，并以市价单发送。如果现在平安银行股票的价格是￥7.5，那么下面的代码会买入1300股的平安银行，因为少于100股的数目将会被自动删除掉。

```python
order_value('000001.XSHE', 10000)
```

- 卖出价值￥10000的现在持有的平安银行：

```python
order_value('000001.XSHE', -10000)
```


#### order_percent

发送一个等于目前投资组合价值（市场价值和目前现金的总和）一定百分比的买/卖单，正数代表买，负数代表卖。股票的股数总是会被调整成对应的一手的股票数的倍数（1手是100股）。百分比是一个小数，并且小于或等于1（<=100%），0.5表示的是50%

```python
order_percent(id_or_ins, percent, style=OrderType)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| id_or_ins | str或instrument对象 -required | order_book_id或symbol或instrument object. |
| percent | float-required | 占有现有的投资组合价值的百分比。正数表示买入，负数表示卖出。|
| style | OrderType-optional | 订单类型，默认是市价单。目前支持的订单类型有：<ul><li>style=MarketOrder()</li><li>style=LimitOrder(<span></span>limit_price)</li></ul> |

**返回**
int，唯一的order id

**范例**

- 买入等于现有投资组合50%价值的平安银行股票。如果现在平安银行的股价是￥10/股并且现在的投资组合总价值是￥2000，那么将会买入200股的平安银行股票。（不包含交易成本和滑点的损失）

```python
order_percent('000001.XSHG', 0.5)
```

#### order_target_value

买入/卖出并且自动调整该证券的仓位到一个目标价值。如果还没有任何该证券的仓位，那么会买入全部目标价值的证券。如果已经有了该证券的仓位，则会买入/卖出调整该证券的现在仓位和目标仓位的价值差值的数目的证券。

```python
order_target_value(id_or_ins, cash_amount, style=OrderType)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| id_or_ins | str或instrument对象-required | order_book_id或symbol或instrument对象. |
| cash_amount | float-required | 最终的该证券的仓位目标价值 |
| style | OrderType-optional | 订单类型，默认是市价单。目前支持的订单类型有：<ul><li>style=MarketOrder()</li><li>style=LimitOrder(<span></span>limit_price)</li></ul> |

**返回**
int，唯一的order id

**范例**

-  如果现在的投资组合中持有价值￥3000的平安银行股票的仓位并且设置其目标价值为￥10000，以下代码范例会发送价值￥7000的平安银行的买单到市场。（向下调整到最接近每手股数即100的倍数的股数）

```python
order_target_value('000001.XSHE', 10000)
```

#### order_target_percent

买入/卖出证券以自动调整该证券的仓位到占有一个指定的投资组合的目标百分比。

- 如果投资组合中没有任何该证券的仓位，那么会买入等于现在投资组合总价值的目标百分比的数目的证券。
- 如果投资组合中已经拥有该证券的仓位，那么会买入/卖出目标百分比和现有百分比的差额数目的证券，最终调整该证券的仓位占据投资组合的比例至目标百分比。

其实我们需要计算一个position_to_adjust (即应该调整的仓位)
```
position_to_adjust = target_position - current_position
```

投资组合价值等于所有已有仓位的价值和剩余现金的总和。买/卖单会被下舍入一手股数（A股是100的倍数）的倍数。目标百分比应该是一个小数，并且最大值应该<=1，比如0.5表示50%。

如果`position_to_adjust` 计算之后是正的，那么会买入该证券，否则会卖出该证券。

```python
order_target_percent(id_or_ins, percent, style=OrderType)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| id_or_ins | str或instrument对象-required | order_book_id或symbol或instrument对象。 |
| percent | float-required | 仓位最终所占投资组合总价值的目标百分比。 |
| style | OrderType-optional | 订单类型，默认是市价单。目前支持的订单类型有：<ul><li>style=MarketOrder()</li><li>style=LimitOrder(<span></span>limit_price)</li></ul> |

**返回**
int，唯一的order id

**范例**

- 如果投资组合中已经有了平安银行股票的仓位，并且占据目前投资组合的10%的价值，那么以下代码会买入平安银行股票最终使其占据投资组合价值的15%：

```python
order_target_percent('平安银行', 0.15)
```

#### cancel_order

取消由order_id代表的限价单。

```python
cancel_order(order_id)
```

#### get_order

通过唯一的order_id拿到对应的订单信息，不过这个订单信息会在`handle_bar`结尾处丢弃掉。

```python
get_order(order_id)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| order_id | int-required | 订单的唯一标示符 |

**返回**
order对象，如：
```python
<Order: filled_shares=100.0 quantity=100.0 instrument=<Instrument: order_book_id='000001.XSHE' symbol='平安银行' abbrev_symbol='PAYH' round_lot=100.0 sector_code='Financials' sector_name='金融'>>
```

#### get_open_orders

获取一个由order_id到order对象映射的dict，凡在此dict中的order都未被完全成交或取消。

----

### 更改context中的预设值

----

#### 更改默认基准

可以在```init```函数中使用：

```python
def init(context):
	context.benchmark = "000001.XSHE"
```

上面的代码片段把你的策略的对比参考基准从默认的```csi300```修改成了平安银行。

----

#### 开启允许卖空

默认卖空是不允许的，不过我们提供了API可以开启卖空，不会让您的卖空单被我们的系统拒掉，可以在```init```函数中使用：

```python
def init(context):
	context.short_selling_allowed = True
```

如果您在测试一些诸如统计套利（pair trading）需要允许卖空机制的策略的时候可以开启这一项，不过注意到在中国A股市场卖空股票是一件非常难的事情。

----

#### 更改滑点

可以在```init```函数中使用：

```python
def init(context):
	context.slippage = 0.5
```

注意 ： 其中的数值应为x%中的x， 例子中的0.5=0.5%。

上面的代码片段把你的策略的滑点更改为了0.5%。

----

#### 更改交易费

可以在```init```函数中使用：

```python
def init(context):
	context.commission = 0.02
```

注意 ： 其中的数值应为x%中的x， 例子中的0.02=0.02%，即万分之2.

上面的代码片段把你的策略使用的交易费更改为了0.02%。

----

### scheduler方法

如果需要在某个日期、某个时间点运行一个函数，可以在```init```函数中使用```scheduler```, **注意：```scheduler```必须在```init```函数中调用。**

```python
scheduler.run_daily(function)
scheduler.run_weekly(function, weekday=x,tradingday=t)
scheduler.run_monthly(function, tradingday=t)
```

#### 定日期运行

**每天**

每天运行一次传入的```function```

```python
scheduler.run_daily(function)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| function | function | 使传入的```function```每日运行 |

**返回**
None

**注意**
1, schedule一定在其对应时间点的handle_bar之后执行。

**范例**

以下的范例代码片段是一个非常简单的例子，在每天交易后查询现在```portfolio```中剩下的cash的情况

```python
def log_cash(context, bar_dict):
    logger.info("Remaning cash: %r" % context.portfolio.cash)

def init(context):
	#...
	# 每天运行一次
	scheduler.run_daily(log_cash)
```

----

**每周某天**

每周在固定的某天运行一下传入的```function```

```python
scheduler.run_weekly(function, weekday=x, tradingday=t)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| function | function | 使传入的```function```每日交易开始前运行 |
| weekday | int - required | 1：周一，2：周二, ..., 5: 周五 |
| tradingday | int - not required | 范围为\[-5,1\],\[1,5\] 例：1（-1）：每周（倒数）第一个交易日，n（-n)：每周（倒数）第n个交易日 |

**返回**
None

**注意**
1, ```tradingday```中的负数表示倒数。

2, ```tradingday```表示交易日。如某周只有四个交易日，则此周的```tradingday=4```与```tradingday=-1```表示同一天

3, ```weekday```和```tradingday```不能同时使用。
**范例**

以下的代码片段非常简单，在每周二固定运行打印一下现在的```portfolio```剩余的资金：

```python
def log_cash(context, bar_dict):
    logger.info("Remaning cash: %r" % context.portfolio.cash)

def init(context):
	#...
	# 每周二打印一下剩余资金：
	scheduler.run_weekly(log_cash, weekday=2)

	# 每周第二个交易日打印剩余资金：
	#scheduler.run_weekly(log_cash, tradingday=2)
```

----

**每月某交易日**

在每月的某个**交易日**运行一次传入的```function```:

```python
scheduler.run_monthly(function,tradingday=t)
```

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| function | function | 使传入的```function```每日交易开始前运行 |
| tradingday | int - required |范围为\[-23,1\], \[1,23\] ，如: 1（-1）：每月（倒数）第一个交易日，2（-2）：每月（倒数）第二个交易日, ..., 28（-28）：每月（倒数）第28个交易日 |

**返回**
None

**注意**
1， ```tradingday```的负数表示倒数

2， ```tradingday```表示交易日，如某月只有三个交易日，则此月的tradingday=3与tradingday=-1表示同一天

**范例**
以下的代码片段非常简单的展示了每个月第一个交易日的时候我们进行一次计算，这样子会在一些大计算量的运算情况下很有用，加快你的算法运行速度：

```python
def heavy_cal(context, bar_dict):
	i = i + 100

# 在这个方法中编写任何的初始化逻辑。context对象将会在你的算法策略的任何方法之间做传递。
def init(context):
	# 每月的第一个交易日查询以下财务数据，以确保可以拿到最新更新的财务数据信息用来调整仓位
	scheduler.run_monthly(heavy_cal, tradingday=1)
```

----

### 其他方法

#### update_universe

```python
update_universe(id_or_symbols)
```

这个方法传入一个或一个列表的```id_or_symbol(s)```作为参数，用以更新现在关注的证券的集合（e.g
.：股票池）。PS：会在下一个bar事件触发时候产生（新的关注的股票池更新）效果。并且update_universe会是覆盖（overwrite）的操作而不是在已有的股票池的基础上进行增量添加。比如已有的股票池为```['000001
.XSHE', '000024.XSHE']```然后调用了```update_universe(['000030.XSHE'])```之后，股票池就会变成```000030
.XSHE```一个股票了，随后的数据更新也只会跟踪```000030.XSHE```这一个股票了。

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| id_or_symbols | str或iterable of strings | 单个或一个id_or_symbol(s)列表. |

**范例**

下面的代码是将股票池变更为只有2个股票```000001.XSHE```和```000024.XSHE```:

```python
update_universe(['000001.XSHE', '000024.XSHE'])
```

----

#### instruments

```python
instruments(id_or_symbols)
```

转换单个string或一个string列表的order_book_id到instrument对象

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| id_or_symbols | str或iterable of strings | 单个或一个列表的order_book_id，中国市场的A股的order_book_ids是类似‘000001.XSHE’的写法 |

**返回**

单个或一个列表的<a href="/api/python/chn#instrument-object" target="_blank">instrument对象</a> - 用id_or_symbol请求的。

**范例**

- 只得到单个instrument的对象：
```python
[In]instruments('000001.XSHE')
[Out]
<Instrument: industry_name='货币金融服务', listed_date=datetime.datetime(1991, 4, 3, 0, 0), round_lot=100.0, listing=False, abbrev_symbol='PAYH', symbol='平安银行', industry_code='J66', type='CS', sector_code='Financials', sector_name='金融', order_book_id='000001.XSHE'>
```

- 得到一个列表的instrument对象 - 中国股票：
```python
[In]instruments(['平安银行', '000024.XSHE'])
[Out]
[<Instrument: industry_name='货币金融服务', listed_date=datetime.datetime(1991, 4, 3, 0, 0), round_lot=100.0, listing=False, abbrev_symbol='PAYH', symbol='平安银行', industry_code='J66', type='CS', sector_code='Financials', sector_name='金融', order_book_id='000001.XSHE'>,
<Instrument: industry_name='房地产业', listed_date=datetime.datetime(1993, 6, 7, 0, 0), round_lot=100.0, listing=False, abbrev_symbol='ZSDC', symbol='招商地产', industry_code='K70', type='CS', sector_code='Financials', sector_name='金融', order_book_id='000024.XSHE'>]
```

----

#### history

```python
history(bar_count, frequency, field)
```

`history`函数返回所有已关注证券的历史行情，同时支持**日以及分钟**历史数据。以pandas的[DataFrame](http://pandas.pydata.org/pandas-docs/dev/dsintro.html#dataframe)对象装载为时间序列。

**注意**：在我们最新加入的可以动态处理调整证券池的功能以后，您并不只能使用`history`函数拿到已经加入证券池的历史数据，您可以拿到所有想要拿的任意的证券的历史数据了。

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| `bar_count` | int-required | 表示回溯的bar的数量 |
| `frequency` | str-required | 表示回溯时以什么样的频率进行。例如"1d"或"1m"分别表示每日和每分钟 |
| `field` | str-required | 制定返回的DataFrame中以哪个指标作为数据值，可取“open”，“close”，“high”，“low”，“volume”，“last”, "total_turnover" - 总成交额 |

**返回**：

DataFrame

**范例：**

1. 拿取四天的历史数据：

```python
print (history(4, '1d', 'close')['000001.XSHE'])
```

当前日期：2013-01-05

| 日期 | 收盘价格 |
| --- | --- |
| 2013-01-02 | 12.0 |
| 2013-01-03 | 11.0 |
| 2013-01-04 | 13.0 |
| 2013-01-05 | 11.0 |

2. 拿取四分钟的历史数据：

```python
print(history(4, '1m', 'close')['000001.XSHE'])
```

当前时间：2014-01-06  09:34:00

| 日期 | 收盘价格 |
| --- | --- |
| 2014-01-06 09:31 | 8.2569 |
| 2014-01-06 09:32 | 8.2292 |
| 2014-01-06 09:33 | 8.2014 |
| 2014-01-06 09:34 | 8.2083 |

----

#### 拿到当前时间

```python
context.now
```

使用以上的方法就可以在`handle_bar`中拿到当前的bar的时间，比如day bar的话就是那天的时间，minute bar的话就是这一分钟的时间点。

----

### Bar对象

Ricequant的后端算法交易系统会处理你的算法中所有关注的证券，我们支持的包括股票、ETF、LOF、分级基金和期货。
它会发送`bar`事件并且将来还可以发送其他的事件给你的算法策略（比如：tick数据）。`bar_dict`是所有的关注的证券的bar数据的一个总集合，你可以在`handle_bar`中拿取到`bar`对象，其中包含了该证券的所有的市场数据信息。

例如，如果你想拿到平安银行股票'000001.XSHE'的切片数据信息，那么可以使用这段代码`bar_dict['000001.XSHE']`。下面会介绍我们已经支持的`bar`对象的属性：

同时对`bar`对象我们也支持如下的转换方法：

```python
mavg(intervals, frequency='day')
```

可以用来计算某个证券的某段时间的移动平均价格，默认单位是‘天’

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| 间隔 | int | 一段时间间隔，比如：3 |
| 频率 | str | 间隔的频率，默认是“天” |

```python
vwap(intervals, frequency='day')
```

可以用来计算某个证券的某段时间的加权平均价格，默认单位是“天”

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| 间隔 | int | 一段时间间隔，比如：3 |
| 频率 | str | 间隔的频率，默认是“天” |

----

### Order对象

在order对象中的属性：

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| `instrument` | instrument对象 | 订单对应的证券的instrument对象 |
| `filled_shares` | float | 该订单已经成交的股数 |
| `quantity` | float | 该订单的所有的股数 |

----

### Portfolio对象

`portfolio`对象包含算法策略的所有的投资组合的信息。在日级别回测中，这表示的是每日收盘以后的投资组合信息。可以使用`context.portfolio`去拿取`portfolio`对象的信息。

并且有以下的属性：

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| `starting_cash` | float | 回测或实盘交易给算法策略设置的初始资金 |
| `cash` | float | 现在投资组合中剩余的现金 |
| `total_returns` | float | 算法投资组合至今的累积百分比收益率。计算方法是现在的投资组合价值/投资组合的初始资金。投资组合价值包含剩余现金和其市场价值。 |
| `daily_returns` | float | 当前最新一天的每日收益。 |
| `market_value` | float | 投资组合当前的市场价值（未实现/平仓的价值） |
| `portfolio_value` | float | 当前投资组合的总共价值，包含市场价值和剩余现金。 |
| `pnl` | float | 当前投资组合的￥盈亏 |
| `start_date` | DateTime | 策略投资组合的回测/实时模拟交易的开始日期 |
| `annualized_returns` | float | 投资组合的年化收益率 |
| `positions` | Dictionary | 一个包含所有仓位的字典，以id_or_symbol作为键，`position`对象作为值，关于position的更多的信息可以在下面的部分找到。 |
| `dividend_receivable` | float | 投资组合在分红现金收到账面之前的应收分红部分。具体细节在[分红部分](#dividends-splits-header) |

----

### Position对象

`position`对象代表一个证券的仓位信息。可以通过positions字典拿到，例如：如果你的投资组合有平安银行股票（000001.XSHE）的仓位，你可以通过以下代码拿到它的仓位：

```python
context.portfolio.positions['000001.XSHE']
```

并且`position`对象有以下的属性：

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| `quantity` | int | 未平仓部分的总股数。 |
| `bought_quantity` | int | 该证券的总买入股数，例如：如果你的投资组合并没有任何平安银行的成交，那么平安银行这个股票的仓位就是0. |
| `sold_quantity` | int | 该证券的总卖出股数，例如：如果你的投资组合曾经买入过平安银行股票200股并且卖出过100股，那么这个属性会返回100. |
| `bought_value` | float | 该证券的总买入的价值，等于每一个该证券的买入成交的价格*买入股数的总和。 |
| `sold_value` | float | 该证券的总卖出价值，等于每一个该证券的卖出成交的价格*卖出股数的总和。 |
| `total_orders` | int | 该仓位的总订单的次数。 |
| `total_trades` | int | 该仓位的总成交的次数。 |
| `sellable` | int | 该仓位可卖出股数。T＋1的市场中sellable = 所有持仓-今日买入的仓位。 |
| `average_cost` | float | 获得该持仓的买入均价，计算方法为每次买入的数量做加权平均。 |
| `market_value` | float | 获得该持仓的实时市场价值。 |
| `value_percent` | float | 获得该持仓的实时市场价值在总投资组合价值中所占比例，取值范围[0, 1]。 |

----

### Instrument对象

`Instrument`代表所有的金融证券，例如：可以是股票，ETF，指数和期货合同。

#### 股票，ETF，指数Instrument对象

股票，ETF，指数Instrument对象有如下的属性：

| 参数 | 类型 | 注释 |
| --- | --- | --- |
| `order_book_id` | str | 证券的独特的标识符。 |
| `symbol` | str | 证券的易读的名字。 |
| `abbrev_symbol` | str | 证券的名称缩写，比如：在中国A股就是股票的拼音缩写，‘PAYH’就是平安银行股票的证券名缩写。 |
| `round_lot` | int | 一手是多少股，中国A股一手是100股。 |
| `sector_code` | str | 板块缩写代码，全球通用标准定义。 |
| `sector_name` | str | 以当地语言为标准的板块代码名。 |
| `industry_code` | str | 国民经济行业分类代码。 |
| `industry_name` | str | 国民经济行业分类名称。 |
| `listing` | bool | 该证券是否还在交易所交易。 |
| `listed_date` | DateTime |该证券的上市日期。 |
| `type` | str | 需要使用种类简称，下面的type列表会解释我们目前支持的证券类型：'CS', 'INDX', 'LOF', 'ETF', 'FenjiMu', 'FenjiA', 'FenjiB', 'Future' |
| `board_type` | str | 'MainBoard' - 主板，'GEM' - 创业板 |

## 开发
```
pyvenv venv
source venv/bin/activate
pip install -e .
```

## 单步调试策略
可以参考wiki，[使用PyCharm进行单步调试](https://github.com/ricequant/rqalpha/wiki/%E4%BD%BF%E7%94%A8PyCharm%E8%BF%9B%E8%A1%8C%E5%8D%95%E6%AD%A5%E8%B0%83%E8%AF%95)。

## 运行单元测试
```
py.test
```
