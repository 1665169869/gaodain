; �ű��� Inno Setup �ű��� ���ɣ�
; �йش��� Inno Setup �ű��ļ�����ϸ��������İ����ĵ���

#define MyAppName "���"
#define MyAppVersion "3.1.1"
#define MyAppPublisher "����"
#define MyAppURL "https://gitee.com/baiyu16/gaogao"
#define MyAppExeName "gaodian.exe"

[Setup]
; ע: AppId��ֵΪ������ʶ��Ӧ�ó���
; ��ҪΪ������װ����ʹ����ͬ��AppIdֵ��
; (��Ҫ�����µ� GUID�����ڲ˵��е�� "����|���� GUID"��)
AppId={{C25F5BFE-3E76-463F-9A0F-7975D196E754}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
; [Icons] �ġ�quicklaunchicon����Ŀʹ�� {userappdata}������ [Tasks] ��Ŀ�����ʺ� IsAdminInstallMode �ļ�顣
UsedUserAreasWarning=no
; ������ȡ��ע�ͣ����ڷǹ���װģʽ�����У���Ϊ��ǰ�û���װ����
;PrivilegesRequired=lowest
PrivilegesRequiredOverridesAllowed=commandline
OutputDir=C:\Users\86136\python\gaogao\dist
OutputBaseFilename=gaodian_setup.{#MyAppVersion}
SetupIconFile=C:\Users\86136\python\gaogao\main\img\favicon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=admin 

[Languages]
Name: "chinesesimp"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: checkablealone
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1; Check: not IsAdminInstallMode

[Files]
Source: "C:\Users\86136\python\gaogao\dist\gaodian\gaodian.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\86136\python\gaogao\dist\gaodian\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; Source: "C:\Users\86136\python\gaogao\main\open.exe"; DestDir: "{app}"; Flags: ignoreversion
; ע��: ��Ҫ���κι���ϵͳ�ļ���ʹ�á�Flags: ignoreversion��

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: quicklaunchicon

[Run]
; Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
 Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: runascurrentuser nowait postinstall skipifsilent

