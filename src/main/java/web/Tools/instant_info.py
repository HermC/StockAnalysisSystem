# -*- coding: UTF-8 -*-
import json
import os,sys
import urllib
from string import strip

from lxml import etree
reload(sys)
sys.setdefaultencoding('utf-8')

url = 'http://gupiao.baidu.com/stock/'+sys.argv[1]+'.html'
response = urllib.urlopen(url).read()
tree = etree.HTML(response)

price = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[1]/strong')[0].text)
if price == '--' or price == '-':
    price = 0
print price

devia_val = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[1]/span[1]')[0].text)
if devia_val == '--' or devia_val == '-':
    devia_val = 0
print devia_val

devia_per = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[1]/span[2]')[0].text)
if devia_per == '--' or devia_per == '-':
    devia_per = 0
print devia_per

open = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[1]/dd')[0].text)
if open == '--' or open == '-':
    price = 0
print open

volume = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[2]/dd')[0].text)
if volume == '--' or volume == '-':
    volume = 0
print volume

high = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[3]/dd')[0].text)
if high == '--' or high == '-':
    high = 0
print high
# print '#############################'
up_stop = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[4]/dd')[0].text)
if up_stop == '--' or up_stop == '-':
    up_stop = 0
print up_stop

inner_count = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[5]/dd')[0].text)
if inner_count == '--' or inner_count == '-':
    inner_count = 0
print inner_count

amount = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[6]/dd')[0].text)
if amount == '--' or amount == '-':
    amount = 0
print amount

committee = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[7]/dd')[0].text)
if committee == '--' or committee == '-':
    committee = 0
print committee

avail_amount = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[8]/dd')[0].text)
if avail_amount == '--' or avail_amount == '-':
    avail_amount = 0
print avail_amount

pe = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[9]/dd')[0].text)
if pe == '--' or pe == '-':
    pe = 0
print pe

profit_per = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[10]/dd')[0].text)
if profit_per == '--' or profit_per == '-':
    profit_per = 0
print profit_per

total_volume = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[11]/dd')[0].text)
if total_volume == '--' or total_volume == '-':
    total_volume = 0
print total_volume

close = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[1]/dd')[0].text)
if close == '--' or close == '-':
    price = 0
print close

turnover = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[2]/dd')[0].text)
if turnover == '--' or turnover == '-':
    turnover = 0
print turnover

low = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[3]/dd')[0].text)
if low == '--' or low == '-':
    low = 0
print low

down_stop = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[4]/dd')[0].text)
if down_stop == '--' or down_stop == '-':
    down_stop = 0
print down_stop

outer_count = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[5]/dd')[0].text)
if outer_count == '--' or outer_count == '-':
    outer_count = 0
print outer_count

amplitude = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[6]/dd')[0].text)
if amplitude == '--' or amplitude == '-':
    amplitude = 0
print amplitude

quantity_ratio = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[7]/dd')[0].text)
if quantity_ratio == '--' or quantity_ratio == '-':
    quantity_ratio = 0
print quantity_ratio

total_amount = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[8]/dd')[0].text)
if total_amount == '--' or total_amount == '-':
    total_amount = 0
print total_amount

pb = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[9]/dd')[0].text)
if pb == '--' or pb == '-':
    pb = 0
print pb

value_per_stock = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[10]/dd')[0].text)
if value_per_stock == '--' or value_per_stock == '-':
    value_per_stock = 0
print value_per_stock

available_stock = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[11]/dd')[0].text)
if available_stock == '--' or available_stock == '-':
    available_stock = 0
print available_stock

high_attri_text = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[3]/dd/@class')[0])
if high_attri_text == 's-up':
    high_attri = 1
else:
    high_attri = 0
print high_attri

low_attri_text = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[3]/dd/@class')[0])
if low_attri_text == 's-up':
    low_attri = 1
else:
    low_attri = 0
print low_attri

up_attri_text = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[1]/dl[4]/dd/@class')[0])
if up_attri_text == 's-up':
    up_attri = 1
else:
    up_attri = 0
print up_attri

down_attri_text = strip(tree.xpath('//*[@id="app-wrap"]/div[2]/div/div[2]/div[2]/dl[4]/dd/@class')[0])
if down_attri_text == 's-up':
    down_attri = 1
else:
    down_attri = 0
print down_attri
#  外盘是卖，内盘是买

url = 'http://gupiao.baidu.com/api/stocks/stocktimeline?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=' + sys.argv[1]
response = urllib.urlopen(url).read()
json_file = json.loads(response)['ask']
print json_file[4]['price']
print json_file[3]['price']
print json_file[2]['price']
print json_file[1]['price']
print json_file[0]['price']
print int(json_file[4]['volume'])/100
print int(json_file[3]['volume'])/100
print int(json_file[2]['volume'])/100
print int(json_file[1]['volume'])/100
print int(json_file[0]['volume'])/100
json_file = json.loads(response)['bid']
print json_file[4]['price']
print json_file[3]['price']
print json_file[2]['price']
print json_file[1]['price']
print json_file[0]['price']
print int(json_file[4]['volume'])/100
print int(json_file[3]['volume'])/100
print int(json_file[2]['volume'])/100
print int(json_file[1]['volume'])/100
print int(json_file[0]['volume'])/100
# print json_file