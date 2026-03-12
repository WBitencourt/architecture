# 1. RBAC (Role-Based Access Control)

Acesso baseado em **papel/cargo**: o sistema só enxerga "este usuário tem a role X" e "a role X tem as permissões Y". Não há regra por contexto nem por atributo do recurso — é uma lista fixa de permissões (ex: `"user:create"`, `"curso:admin"`). Simples, mas pouco flexível para regras do tipo "só pode editar o próprio registro".

# 2. ABAC (Attribute-Based Access Control)

Acesso baseado em **atributos**: a decisão usa quem é o usuário, qual é o recurso e o contexto (país, horário, status do recurso, etc.). Em vez de "Admin pode tudo", você define regras como "pode fazer *update* em *user* nos campos *name, email* **se** *country = Brazil*". Mais expressivo que RBAC e alinhado ao modelo de políticas do AWS IAM.

# 2.1. Anatomia do JSON (Terminologia Técnica)
- **Effect (Efeito):** "Allow" ou "Deny". Define se a política concede ou nega acesso.
- **Action (Ação):** O "verbo". Define a operação (ex: update, manage, read).
- **Subject (Assunto/Recurso):** O "substantivo". Define em qual entidade a ação atua.
- **Fields (Camadas/Atributos):** Também chamado de Fine-grained access (acesso fino). Define a granularidade da permissão em nível de coluna/propriedade.
- **Conditions (Condições/Predicados):** Define o Escopo. É onde a lógica de negócio entra (ex: "só se o status for aberto").

# 3. Curiosidade: O padrão AWS IAM
Se você olhar as políticas do AWS IAM, verá que elas seguem exatamente essa lógica, apenas com nomes de chaves diferentes:

| AWS           | Este JSON   |
| ------------- | ----------- |
| Version       | version     |
| Statement     | statement  |
| Effect        | effect     |
| Action        | action     |
| Resource      | subject    |
| Condition     | conditions |

**Convenção:** Neste projeto usamos chaves em *lowercase* (`version`, `statement`, `effect`) no JSON; o IAM da AWS usa PascalCase na API. Os valores de `effect` são `"allow"` ou `"deny"` (lowercase).

Exemplo **AWS IAM** (PascalCase):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::meu-bucket-exemplo/*"
    }
  ]
}
```

Exemplo **nosso ABAC** (lowercase, com subject/fields/conditions):

```json
{
  "version": "2012-10-17",
  "statement": [
    {
      "effect": "allow",
      "action": "update",
      "subject": "user",
      "fields": ["name", "email"],
      "conditions": { "country": "Brazil" }
    },
    {
      "effect": "deny",
      "action": "update",
      "subject": "user",
      "conditions": { "role": "admin" }
    }
  ]
}
```
