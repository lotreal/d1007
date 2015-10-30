::文件名：任务导出.bat
::作者：daybug      创建日期：2008-2-20
::功能：将数据库备份导出到以当前日期和时间命名的文件中，并保存到该月的文件夹下。
::注意：脚本仅在Windows XP中文版操作系统下测试可用，其他环境下请先测试是否可用。

::启动mysql服务
::根据当前的日期时间，生成备份的文件名。
@set FileName=bak-[%date:~0,10%-%time:~0,2%-%time:~3,2%-%time:~6,2%.%time:~9,2%]-wuhanx.sql
::生成当月的文件夹名
@set DirName=%date:~0,7%
::每月1号创建新的文件夹
@if %date:~8,2%==01 (md %DirName%)
::如果没有本月文件夹（初次运行时如果不是1号），则创建本月文件夹
@if not exist %DirName% (md %DirName%)
::执行导出
@E:\sbin\xampp\mysql\bin\mysqldump  -uroot wuhanx >%DirName%\%FileName%
@echo 导出成功
@pause
