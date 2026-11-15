# Script PowerShell para empacotar o projeto em arquivo .ZIP para entrega sem node_modules
$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$zipOutput = Join-Path $projectRoot "automacao-web-pgats-entrega.zip"
$tempFolder = Join-Path $projectRoot "temp_package_delivery"

Write-Host "Criando pacote limpo para entrega..." -ForegroundColor Cyan

if (Test-Path $zipOutput) {
    Remove-Item $zipOutput -Force
}

if (Test-Path $tempFolder) {
    Remove-Item $tempFolder -Recurse -Force
}

New-Item -ItemType Directory -Path $tempFolder | Out-Null

$itemsToCopy = Get-ChildItem -Path $projectRoot -Exclude "node_modules", "temp_package_delivery", "*.zip", ".git"

foreach ($item in $itemsToCopy) {
    Copy-Item -Path $item.FullName -Destination $tempFolder -Recurse -Force
}

Compress-Archive -Path "$tempFolder\*" -DestinationPath $zipOutput -Force

Remove-Item $tempFolder -Recurse -Force

Write-Host "Pacote criado com sucesso em: $zipOutput (node_modules omitido)" -ForegroundColor Green
