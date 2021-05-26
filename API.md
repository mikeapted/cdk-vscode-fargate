# API Reference

**Classes**

Name|Description
----|-----------
[VSCodeFargate](#cdk-vscode-fargate-vscodefargate)|A construct that consists of an ECS Service and related infrastructure to host a VSCode instance using a container (defaults to ghcr.io/linuxserver/code-server). Data is persisted via an EFS volume.


**Structs**

Name|Description
----|-----------
[VSCodeFargateProps](#cdk-vscode-fargate-vscodefargateprops)|*No description*



## class VSCodeFargate  <a id="cdk-vscode-fargate-vscodefargate"></a>

A construct that consists of an ECS Service and related infrastructure to host a VSCode instance using a container (defaults to ghcr.io/linuxserver/code-server). Data is persisted via an EFS volume.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new VSCodeFargate(scope: Construct, id: string, props: VSCodeFargateProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[VSCodeFargateProps](#cdk-vscode-fargate-vscodefargateprops)</code>)  *No description*
  * **domainName** (<code>string</code>)  A full domain to register the new endpoint in. 
  * **subdomain** (<code>string</code>)  A subdomain for the new endpoint. 
  * **containerImage** (<code>string</code>)  An optional container image to use. __*Default*__: ghcr.io/linuxserver/code-server
  * **hostedZone** (<code>[IHostedZone](#aws-cdk-aws-route53-ihostedzone)</code>)  An optional HostedZone to use. __*Optional*__
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  An optional VPC to put ECS in. __*Default*__: default VPC from lookup



### Properties


Name | Type | Description 
-----|------|-------------
**endpoint** | <code>string</code> | <span></span>



## struct VSCodeFargateProps  <a id="cdk-vscode-fargate-vscodefargateprops"></a>






Name | Type | Description 
-----|------|-------------
**domainName** | <code>string</code> | A full domain to register the new endpoint in.
**subdomain** | <code>string</code> | A subdomain for the new endpoint.
**containerImage**? | <code>string</code> | An optional container image to use.<br/>__*Default*__: ghcr.io/linuxserver/code-server
**hostedZone**? | <code>[IHostedZone](#aws-cdk-aws-route53-ihostedzone)</code> | An optional HostedZone to use.<br/>__*Optional*__
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | An optional VPC to put ECS in.<br/>__*Default*__: default VPC from lookup



