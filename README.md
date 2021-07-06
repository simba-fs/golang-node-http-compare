# golang-node-http-compare
comparing response time of servers written in golang and nodejs

# Introduce
我用兩個最簡單的 web server 進行比較，他們的功能都只有回應字串，沒有 log 紀錄，沒有額外的多執行續或處理，程式碼可以在 [src](./src) 找到

# Result
測試軟體是 apache bench，以下是測試結果（ 1000000 / 100 ），兩個伺服器同時運行，但是分別進行測試


> noteBook(ubuntu 20.04)  
  CPU: 8 cores  
  MEM: 16G

```
Server Software:        nodejs(ts-node)                                               │Server Software:        golang
Server Hostname:        localhost                                                     │Server Hostname:        localhost
Server Port:            3000                                                          │Server Port:            4000
                                                                                      │
Document Path:          /                                                             │Document Path:          /
Document Length:        30 bytes                                                      │Document Length:        30 bytes
                                                                                      │
Concurrency Level:      100                                                           │Concurrency Level:      100
Time taken for tests:   152.435 seconds                                               │Time taken for tests:   54.824 seconds
Complete requests:      1000000                                                       │Complete requests:      1000000
Failed requests:        0                                                             │Failed requests:        0
Total transferred:      230000000 bytes                                               │Total transferred:      146000000 bytes
HTML transferred:       30000000 bytes                                                │HTML transferred:       30000000 bytes
Requests per second:    6560.16 [#/sec] (mean)                                        │Requests per second:    18240.02 [#/sec] (mean)
Time per request:       15.244 [ms] (mean)                                            │Time per request:       5.482 [ms] (mean)
Time per request:       0.152 [ms] (mean, across all concurrent requests)             │Time per request:       0.055 [ms] (mean, across all concurrent requests)
Transfer rate:          1473.47 [Kbytes/sec] received                                 │Transfer rate:          2600.63 [Kbytes/sec] received
                                                                                      │
Connection Times (ms)                                                                 │Connection Times (ms)
              min  mean[+/-sd] median   max                                           │              min  mean[+/-sd] median   max
Connect:        0    1   0.4      1       5                                           │Connect:        0    3   0.6      3       8
Processing:     7   14   2.9     13      65                                           │Processing:     0    3   0.6      3      18
Waiting:        2   11   2.7     10      62                                           │Waiting:        0    2   0.6      2      17
Total:         10   15   2.9     14      65                                           │Total:          0    5   0.5      5      21
                                                                                      │
Percentage of the requests served within a certain time (ms)                          │Percentage of the requests served within a certain time (ms)
  50%     14                                                                          │  50%      5
  66%     15                                                                          │  66%      5
  75%     16                                                                          │  75%      6
  80%     17                                                                          │  80%      6
  90%     18                                                                          │  90%      6
  95%     20                                                                          │  95%      6
  98%     23                                                                          │  98%      8
  99%     25                                                                          │  99%      8
 100%     65 (longest request)                                                        │ 100%     21 (longest request)
~ > ab -n 1000000 -c 100 http://localhost:3000/ #this is nodejs server                │~ > ab -n 1000000 -c 100 http://localhost:4000/ # this is golang server         
```

> VPS(linode, ubuntu server 18.04)  
  CPU: 1 cores  
  MEM: 1G

```
Server Software:        nodejs(ts-node)                                               │Server Software:        golang
Server Hostname:        localhost                                                     │Server Hostname:        localhost
Server Port:            3000                                                          │Server Port:            4000
                                                                                      │
Document Path:          /                                                             │Document Path:          /
Document Length:        30 bytes                                                      │Document Length:        30 bytes
                                                                                      │
Concurrency Level:      100                                                           │Concurrency Level:      100
Time taken for tests:   498.612 seconds                                               │Time taken for tests:   306.857 seconds
Complete requests:      1000000                                                       │Complete requests:      1000000
Failed requests:        0                                                             │Failed requests:        0
Total transferred:      230000000 bytes                                               │Total transferred:      146000000 bytes
HTML transferred:       30000000 bytes                                                │HTML transferred:       30000000 bytes
Requests per second:    2005.57 [#/sec] (mean)                                        │Requests per second:    3258.85 [#/sec] (mean)
Time per request:       49.861 [ms] (mean)                                            │Time per request:       30.686 [ms] (mean)
Time per request:       0.499 [ms] (mean, across all concurrent requests)             │Time per request:       0.307 [ms] (mean, across all concurrent requests)
Transfer rate:          450.47 [Kbytes/sec] received                                  │Transfer rate:          464.64 [Kbytes/sec] received
                                                                                      │
Connection Times (ms)                                                                 │Connection Times (ms)
              min  mean[+/-sd] median   max                                           │              min  mean[+/-sd] median   max
Connect:        0    1   6.4      0     274                                           │Connect:        0   13   7.7     12     260
Processing:     2   48  27.5     42     603                                           │Processing:     0   18  11.7     16     636
Waiting:        1   35  21.1     32     598                                           │Waiting:        0   13  10.2     12     589
Total:         10   50  28.8     43     643                                           │Total:          0   31  14.7     28     740
                                                                                      │
Percentage of the requests served within a certain time (ms)                          │Percentage of the requests served within a certain time (ms)
  50%     43                                                                          │  50%     28
  66%     47                                                                          │  66%     32
  75%     51                                                                          │  75%     35
  80%     54                                                                          │  80%     36
  90%     71                                                                          │  90%     42
  95%     96                                                                          │  95%     49
  98%    140                                                                          │  98%     65
  99%    178                                                                          │  99%     85
 100%    643 (longest request)                                                        │ 100%    740 (longest request)
~ > $ ab -n 1000000 -c 100 http://localhost:4000/                                     │~ > $ ab -n 1000000 -c 100 http://localhost:4000/
```

# Summary
整體來說 golang 在各項數據都比 nodejs 快/好二到三倍左右，但是 connection time 卻是 golang 比較長一點點。
還有一點可能需要更多機器測試，核心數越多時是否 golang 和 nodejs 的差聚會變大，以目前我測試的機器有這樣的頃向
