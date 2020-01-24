[Setup]
AppPublisher=INDEV, Ltd.
AppPublisherURL=http://www.indevstudio.com/
AppName=CPN IDE
AppVersion=1.1
WizardStyle=modern
DefaultDirName={autopf}\CPN IDE
DefaultGroupName=CPN IDE
UninstallDisplayIcon={app}\cpn-ide.exe
Compression=lzma2
SolidCompression=yes
OutputDir=.
OutputBaseFilename=cpn-ide-setup

[Files]
Source: "win-unpacked\*"; DestDir: "{app}"
Source: "win-unpacked\locales\*"; DestDir: "{app}\locales"
Source: "win-unpacked\resources\*"; DestDir: "{app}\resources"
Source: "win-unpacked\resources\backend\*"; DestDir: "{app}\resources\backend"

[Icons]
Name: "{group}\Run CPN IDE"; Filename: "{app}\cpn-ide.exe"
Name: "{group}\Uninstall CPN IDE"; Filename: "{app}\unins000.exe"