::�ļ��������񵼳�.bat
::���ߣ�daybug      �������ڣ�2008-2-20
::���ܣ������ݿⱸ�ݵ������Ե�ǰ���ں�ʱ���������ļ��У������浽���µ��ļ����¡�
::ע�⣺�ű�����Windows XP���İ����ϵͳ�²��Կ��ã��������������Ȳ����Ƿ���á�

::����mysql����
::���ݵ�ǰ������ʱ�䣬���ɱ��ݵ��ļ�����
@set FileName=bak-[%date:~0,10%-%time:~0,2%-%time:~3,2%-%time:~6,2%.%time:~9,2%]-wuhanx.sql
::���ɵ��µ��ļ�����
@set DirName=%date:~0,7%
::ÿ��1�Ŵ����µ��ļ���
@if %date:~8,2%==01 (md %DirName%)
::���û�б����ļ��У���������ʱ�������1�ţ����򴴽������ļ���
@if not exist %DirName% (md %DirName%)
::ִ�е���
@E:\sbin\xampp\mysql\bin\mysqldump  -uroot wuhanx >%DirName%\%FileName%
@echo �����ɹ�
@pause
