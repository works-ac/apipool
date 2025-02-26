$credentialPath = "credentials.json"
$dockerUsername = ""
$branch = ""

$loginStatus = docker login | findstr "Login Succeeded"

if ($loginStatus -ne "Login Succeeded") {
  $branch = Read-Host "Enter the branch name"
}

if (Test-Path -Path $credentialPath) {
  $credentials = Get-Content -Path $credentialPath -Raw | ConvertFrom-Json
  
  if ($credentials.Branch) {
    Write-Output "Deploying the app, please wait..."

    caprover deploy -h "$($credentials.Host)" -p "$($credentials.Password)" --appName "$($credentials.AppName)" --branch "$($credentials.Branch)"
    
    return;
  }
  
  Write-Output "Preparing the image..."
  
  docker build -t $($credentials.ImgName) .
  $buildStatus = $LASTEXITCODE;

  if($buildStatus -ne 0) {
    Write-Output "Failed to build the image"
    return;
  }

  docker push $($credentials.ImgName)

  Write-Output "Deploying the app, please wait..."

  caprover deploy -h "$($credentials.Host)" -p "$($credentials.Password)" -i "$($credentials.ImgName)" --appName "$($credentials.AppName)"
}
else {
  Write-Output "Preparing the image..."

  if ($branch -ne "") {
    $uri = Read-Host "Enter your caprover host"
    $hashedPwd = Read-Host "Enter your caprover password" -AsSecureString
    $appName = Read-Host "Enter your app name" 
    $plainPwd = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
      [Runtime.InteropServices.Marshal]::SecureStringToBSTR($hashedPwd)
    )

    caprover deploy -h "$uri" -p "$plainPwd" --appName "$appName" --branch "$branch" 

    $fileContents = @{
      Host     = $uri
      Password = $plainPwd
      AppName  = $appName
      Branch   = $branch
    }
    $data = $fileContents | ConvertTo-Json -Depth 10
  
    Set-Content -Path $credentialPath -Value $data -Encoding UTF8
    return;
  }

  if ($loginStatus -eq "Login Succeeded") {
    $dockerUsername = Read-Host "Enter your docker username"
  }

  $uri = Read-Host "Enter your caprover host"
  $hashedPwd = Read-Host "Enter your caprover password" -AsSecureString
  $appName = Read-Host "Enter your app name" 
  $imgName = Read-Host "Enter your docker image name (without docker username)"

  docker build -t "$dockerUsername/$imgName" .
  $buildStatus = $LASTEXITCODE;

  if($buildStatus -ne 0) {
    Write-Output "Failed to build the image"
    return;
  }

  docker push "$dockerUsername/$imgName"
  
  Write-Output "Deploying the app, please wait..."
  $plainPwd = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($hashedPwd)
  )
  
  caprover deploy -h "$uri" -p "$plainPwd" -i "$dockerUsername/$imgName" --appName "$appName"

  $fileContents = @{
    Host     = $uri
    Password = $plainPwd
    AppName  = $appName
    ImgName  = "$dockerUsername/$imgName"
  }
  $data = $fileContents | ConvertTo-Json -Depth 10

  Set-Content -Path $credentialPath -Value $data -Encoding UTF8
}