import urllib2
import json
import sys
import numpy as np
from scipy import stats

def get_input():
    param = []
    for i in range(1, len(sys.argv)):
        param.append(sys.argv[i])
    return param


def stockOpen(param):
    url = "http://121.41.106.89:8010/api/stock/"+param[0]+"/?start="+param[2]+"&end="+param[3]
    req = urllib2.Request(url)
    req.add_header('X-Auth-Code', '75d07493b655591137dbc905ede428ce')
    res_data = urllib2.urlopen(req)
    res = res_data.read()
    json_file = json.loads(res)['applet.futureData']['trading_info']

    open = []

    for x in xrange(0, len(json_file)):
        open.append(json_file[x]['open'])

    return open


def benchOpen(param):
    url = "http://121.41.106.89:8010/api/benchmark/" + param[1] + "/?start=" + param[2] + "&end=" + param[3]
    req = urllib2.Request(url)
    req.add_header('X-Auth-Code', '75d07493b655591137dbc905ede428ce')
    res_data = urllib2.urlopen(req)
    res = res_data.read()
    json_file = json.loads(res)['applet.futureData']['trading_info']

    open = []

    for x in xrange(0, len(json_file)):
        open.append(json_file[x]['open'])

    return open

stock_data = stockOpen(get_input())
bench_data = benchOpen(get_input())

except_of_stock = np.mean(stock_data)
except_of_bencmark = np.mean(bench_data)

stock_info = stats.describe(stock_data)
bench_info = stats.describe(bench_data)

cov_data = np.array([stock_data, bench_data]).T
cov = np.cov(cov_data, bias=0)[0][1]

cov_data_origin = []
for x in xrange(0, len(stock_data)):
    cov_data_origin.append(stock_data[x]*bench_data[x])
cov_origin = np.mean(cov_data_origin) - except_of_stock*except_of_bencmark

print(bench_info[2])
print(bench_info[3])
print(bench_info[4])
print bench_info[5]
print(stock_info[2])
print(stock_info[3])
print stock_info[4]
print stock_info[5]
# print(cov)
# print(cov_origin)
print(np.corrcoef(stock_data, bench_data, rowvar=0)[0][1])
# print(cov_origin/np.sqrt(np.var(stock_data)*np.var(bench_data)))
