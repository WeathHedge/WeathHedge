const {
    ResponseListener,
    ReturnType,
    decodeResult,
    FulfillmentCode,
  } = require("@chainlink/functions-toolkit");
  const functionsConsumerAbi = require("../abi/functionsClient.json");
  const ethers = require("ethers");
  require("@chainlink/env-enc").config();
  
  const consumerAddress = "0xA7873286671D63b5E3769B187B172BFd3c42769A"; // REPLACE this with your Functions consumer address
  const subscriptionId = 444; // REPLACE this with your subscription ID
  
  // hardcoded for Polygon Mumbai
  const makeRequestMumbai = async () => {
    const routerAddress = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
    const donId = "fun-polygon-mumbai-1";
    const explorerUrl = "https://mumbai.polygonscan.com";
  
    const source = `
    // This function fetches the latest temperature for a particular area from openweathermap API
    // Args include the zipcode of your location, ISO 3166 country code
    // units- unit in which we want the temperature (standard, metric, imperial)
    
    
    // if (!secrets.apiKey) {
    //   throw Error("Weather API Key is not available!")
    // }
    
    const zipCode = args[0]+","+args[1]
    
    const geoCodingURL = "https://api.openweathermap.org/geo/1.0/zip"
    
    // console.log(\`Sending HTTP request to \${geoCodingURL}zip=\${zipCode}\`)
    
    const geoCodingRequest = Functions.makeHttpRequest({
        url: geoCodingURL,
        method: "GET",
        params: {
            zip: zipCode,
            appid: args[3]
        }
    })
    console.log(args[3])
    const geoCodingResponse = await geoCodingRequest;
    console.log(geoCodingResponse);
    
    if (geoCodingResponse.error) {
        console.error(geoCodingResponse.error)
        throw Error(JSON.stringify(geoCodingResponse.error))
    }
    
    console.log(geoCodingResponse);
    
    const latitude = geoCodingResponse.data.lat
    const longitude = geoCodingResponse.data.lon
    const unit = args[2]
    
    const url = "https://api.openweathermap.org/data/2.5/weather"
    
    // console.log(\`Sending HTTP request to \${url}lat=\${latitude}&lon=\${longitude}&units=\${unit}\`)
    
    const weatherRequest = Functions.makeHttpRequest({
      url: url,
      method: "GET",
      params: {
        lat: latitude,
        lon: longitude,
        appid: args[3],
        units: unit
      }
    })
    
    // Execute the API request (Promise)
    const weatherResponse = await weatherRequest
    if (weatherResponse.error) {
      console.error(weatherResponse.error)
      throw Error("Request failed, try checking the params provided")
    }
    
    // gets the current temperature
    const temperature = weatherResponse.data.main.temp
    
    // Gives the whole response from the request
    console.log("Weather response", weatherResponse)
    
    // result is in JSON object, containing only temperature
    const result = temperature
    
    // Use JSON.stringify() to convert from JSON object to JSON string
    // Finally, use the helper Functions.encodeString() to encode from string to bytes
    return Functions.encodeString(JSON.stringify(result))
        `;
  
    const args = ["380058","IN","imperial", "66a8a445cf0f00a770d01b2382cfb9df"];
    const gasLimit = 300000;
  
    //////// MAKE REQUEST ////////
  
    console.log("\nMake a Chainlink Functions request...");
    const privateKey = process.env.PRIVATE_KEY; // fetch PRIVATE_KEY
    if (!privateKey)
      throw new Error(
        "private key not provided - check your environment variables"
      );
  
    const rpcUrl = process.env.POLYGON_MUMBAI_RPC_URL; // fetch mumbai RPC URL
  
    if (!rpcUrl)
      throw new Error(`rpcUrl not provided  - check your environment variables`);
  
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider); // create ethers signer for signing transactions
  
    const functionsConsumer = new ethers.Contract(
      consumerAddress,
      functionsConsumerAbi,
      signer
    );
  
    // To simulate the call and get the requestId.
    const requestId = await functionsConsumer.callStatic.sendRequest(
      source, // source
      "0x", // user hosted secrets - encryptedSecretsUrls - empty in this example
      0, // don hosted secrets - slot ID - empty in this example
      0, // don hosted secrets - version - empty in this example
      args,
      [], // bytesArgs - arguments can be encoded off-chain to bytes.
      subscriptionId,
      gasLimit,
      ethers.utils.formatBytes32String(donId) // jobId is bytes32 representation of donId
    );
  
    // Actual transaction call
    const transaction = await functionsConsumer.sendRequest(
      source, // source
      "0x", // user hosted secrets - encryptedSecretsUrls - empty in this example
      0, // don hosted secrets - slot ID - empty in this example
      0, // don hosted secrets - version - empty in this example
      args,
      [], // bytesArgs - arguments can be encoded off-chain to bytes.
      subscriptionId,
      gasLimit,
      ethers.utils.formatBytes32String(donId) // jobId is bytes32 representation of donId
    );
  
    // Log transaction details
    console.log(
      `\n✅ Functions request sent! Transaction hash ${transaction.hash} -  Request id is ${requestId}. Waiting for a response...`
    );
  
    console.log(
      `See your request in the explorer ${explorerUrl}/tx/${transaction.hash}`
    );
  
    const responseListener = new ResponseListener({
      provider: provider,
      functionsRouterAddress: routerAddress,
    }); // Instantiate a ResponseListener object to wait for fulfillment.
    (async () => {
      try {
        const response = await new Promise((resolve, reject) => {
          responseListener
            .listenForResponse(requestId)
            .then((response) => {
              resolve(response); // Resolves once the request has been fulfilled.
            })
            .catch((error) => {
              reject(error); // Indicate that an error occurred while waiting for fulfillment.
            });
        });
  
        const fulfillmentCode = response.fulfillmentCode;
  
        if (fulfillmentCode === FulfillmentCode.FULFILLED) {
          console.log(
            `\n✅ Request ${requestId} successfully fulfilled. Cost is ${ethers.utils.formatEther(
              response.totalCostInJuels
            )} LINK.Complete reponse: `,
            response
          );
        } else if (fulfillmentCode === FulfillmentCode.USER_CALLBACK_ERROR) {
          console.log(
            `\n⚠️ Request ${requestId} fulfilled. However, the consumer contract callback failed. Cost is ${ethers.utils.formatEther(
              response.totalCostInJuels
            )} LINK.Complete reponse: `,
            response
          );
        } else {
          console.log(
            `\n❌ Request ${requestId} not fulfilled. Code: ${fulfillmentCode}. Cost is ${ethers.utils.formatEther(
              response.totalCostInJuels
            )} LINK.Complete reponse: `,
            response
          );
        }
  
        const errorString = response.errorString;
        if (errorString) {
          console.log(`\n❌ Error during the execution: `, errorString);
        } else {
          const responseBytesHexstring = response.responseBytesHexstring;
          if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
            const decodedResponse = decodeResult(
              response.responseBytesHexstring,
              ReturnType.int256
            );
            console.log(
              `\n✅ Decoded response to ${ReturnType.int256}: `,
              decodedResponse
            );
          }
        }
      } catch (error) {
        console.error("Error listening for response:", error);
      }
    })();
  };
  
  makeRequestMumbai().catch((e) => {
    console.error(e);
    process.exit(1);
  });