function Get-Pi-Network-GBP {
    <#
    .SYNOPSIS
    Retrieves Pi Network exchange rate and market data in GBP, accurate up to the last 6 hours.

    .DESCRIPTION
    This cmdlet calls the JSON endpoint hosted at trossr32.github.io to retrieve
    exchange rate, market cap, and 24-hour change data for the Pi Network cryptocurrency.
    
    The data is returned as a PowerShell object for easy access and scripting.

    .EXAMPLE
    Get-Pi-Network-GBP
    Returns the parsed object containing exchange rate and market data for Pi Network.

    .EXAMPLE
    $data = Get-Pi-Network-GBP
    $data.priceGBP
    $data.lastUpdated
    Get the data as an object and view it's properties.

    .EXAMPLE
    Get-Pi-Network-GBP | Format-List
    Format the output as a list for better readability.

    .OUTPUTS
    PSCustomObject
    #>

    [CmdletBinding()]
    param()

    # Define the API endpoint
    $url = "https://trossr32.github.io/pi-network-gbp/data/data.json"

    try {
        # Make a web request and parse the response as JSON
        $response = Invoke-RestMethod -Uri $url -Method Get -ErrorAction Stop

        # Output the PowerShell object
        return $response
    }
    catch {
        Write-Error "Failed to retrieve Pi Network data from $url. Error: $_"
    }
}
