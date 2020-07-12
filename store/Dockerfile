FROM redis

COPY redis.conf /usr/local/etc/redis/redis.conf

RUN echo 'vm.overcommit_memory = 1' >> /etc/sysctl.conf
RUN echo 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' >> /etc/rc.local

CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]