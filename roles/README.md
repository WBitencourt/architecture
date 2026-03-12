# 1. RBAC (Role-Based Access Control)

Access is based on **role**: the system only sees "this user has role X" and "role X has permissions Y". There are no context or resource-attribute rules — just a fixed list of permissions (e.g. `"user:create"`, `"curso:admin"`). Simple, but not very flexible for rules like "can only edit their own record".

# 2. ABAC (Attribute-Based Access Control)

Access is based on **attributes**: the decision uses who the user is, what the resource is, and context (country, time, resource status, etc.). Instead of "Admin can do everything", you define rules like "can *update* *user* on fields *name, email* **if** *country = Brazil*". More expressive than RBAC and aligned with the AWS IAM policy model.

# 2.1. Anatomy of the JSON (Technical Terminology)
- **Effect:** "Allow" or "Deny". Defines whether the policy grants or denies access.
- **Action:** The "verb". Defines the operation (e.g. update, manage, read).
- **Subject (Resource):** The "noun". Defines which entity the action applies to.
- **Fields:** Also called fine-grained access. Defines permission granularity at the column/property level.
- **Conditions:** Defines scope. Where business logic lives (e.g. "only if status is open").

# 3. Database

Schema: `roles/abac.prisma`. Summary of relationships so you can quickly recall how things connect.

| Model | Relationship | With | Meaning |
| ----- | ------------- | ----- | -------- |
| **User** | N:N | **Role** | A user can have several roles (e.g. RH, Suporte); a role can be assigned to many users. Prisma uses an implicit pivot table. |
| **User** | 1:N | **UserPermission** | A user can have many custom permission statements (overrides/exceptions per user). |
| **Role** | 1:N | **RolePermission** | A role has many permission statements (the default ABAC policy for that role). |

**Flow when resolving access:**  
1. Get the user’s **roles** and collect all **RolePermission** rows for those roles.  
2. Add the user’s **UserPermission** rows (custom/override).  
3. Merge and evaluate (e.g. deny overrides allow, conditions and fields apply).  

So: **User ↔ Role** (many-to-many), **Role → RolePermission** (one-to-many), **User → UserPermission** (one-to-many). Role permissions are the base; user permissions extend or override them.

# 4. Note: The AWS IAM pattern
If you look at AWS IAM policies, they follow this same logic, with different key names:

| AWS           | This JSON   |
| ------------- | ----------- |
| Version       | version     |
| Statement     | statement  |
| Effect        | effect     |
| Action        | action     |
| Resource      | subject    |
| Condition     | conditions |

**Convention:** In this project we use *lowercase* keys (`version`, `statement`, `effect`) in the JSON; AWS IAM uses PascalCase in its API. The `effect` values are `"allow"` or `"deny"` (lowercase).

**AWS IAM** example (PascalCase):

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

**Our ABAC** example (lowercase, with subject/fields/conditions):

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
