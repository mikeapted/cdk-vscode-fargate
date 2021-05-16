# API Reference

**Classes**

Name|Description
----|-----------
[VSCodeFargate](#cdk-vscode-fargate-vscodefargate)|*No description*


**Structs**

Name|Description
----|-----------
[VSCodeFargateProps](#cdk-vscode-fargate-vscodefargateprops)|*No description*



## class VSCodeFargate  <a id="cdk-vscode-fargate-vscodefargate"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new VSCodeFargate(scope: Construct, id: string, props: VSCodeFargateProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[VSCodeFargateProps](#cdk-vscode-fargate-vscodefargateprops)</code>)  *No description*
  * **domainName** (<code>string</code>)  *No description* 
  * **subdomain** (<code>string</code>)  *No description* 
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**endpoint** | <code>string</code> | <span></span>



## struct VSCodeFargateProps  <a id="cdk-vscode-fargate-vscodefargateprops"></a>






Name | Type | Description 
-----|------|-------------
**domainName** | <code>string</code> | <span></span>
**subdomain** | <code>string</code> | <span></span>
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | __*Optional*__



