# Recorta uma área de uma imagem-fonte e salva JPEG em uma ou mais larguras.
# Uso: .\scripts\crop-image.ps1 -Source assets-originals\results-source.png -X 893 -Y 0 -W 881 -H 887 -Out public\images\hero-face -Widths 881,480
param([string]$Source,[int]$X,[int]$Y,[int]$W,[int]$H,[string]$Out,[int[]]$Widths=@(1200,480),[long]$Quality=82)
Add-Type -AssemblyName System.Drawing
$root=(Get-Location).Path
$src=New-Object System.Drawing.Bitmap (Join-Path $root $Source)
$codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()|Where-Object{$_.MimeType -eq 'image/jpeg'}
$params=New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,$Quality)
$area=New-Object System.Drawing.Rectangle($X,$Y,$W,$H)
foreach($width in $Widths){
  $height=[int][Math]::Round($H*$width/$W)
  $dst=New-Object System.Drawing.Bitmap($width,$height)
  $g=[System.Drawing.Graphics]::FromImage($dst)
  $g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($src,(New-Object System.Drawing.Rectangle(0,0,$width,$height)),$area,[System.Drawing.GraphicsUnit]::Pixel)
  $suffix=if($width -eq $Widths[0]){''}else{'-sm'}
  $file=Join-Path $root "$Out$suffix.jpg"
  $dst.Save($file,$codec,$params)
  $g.Dispose();$dst.Dispose()
  Write-Output "$file $((Get-Item $file).Length) bytes"
}
$src.Dispose()
