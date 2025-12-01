# UI Atoms – Denaro Template

This folder contains **all atomic UI components** used across Denaro templates.  
Total: **263 atomic components** organized into 46 files.

---

### 📦 Why So Many?
- Only a **subset** is used in this template demo.  
- We include the **full atomic library** in every template to give you maximum flexibility.  
- Next.js automatically **tree-shakes unused components**, so your production build stays lean.  

---

### 📂 Categories
- **Forms & Inputs**
  - Button, Input, Textarea, Select, Checkbox, RadioGroup, OTPInput
- **Navigation**
  - Breadcrumb, Tabs, Menubar, NavigationMenu, Pagination
- **Overlays**
  - Dialog, Drawer, AlertDialog, Popover, Tooltip, HoverCard
- **Feedback**
  - Badge, Alert, Toast (Sonner), Progress, Skeleton
- **Data Display**
  - Card, Table, Avatar, Chart, Calendar
- **Layout Utilities**
  - Accordion, Collapsible, Carousel, Resizable, Sidebar, Separator

---

### ✅ Usage Example
```tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>Plan</CardHeader>
      <CardContent>$49/month</CardContent>
    </Card>
  );
}
```
---

### 💡 Notes
- Consistency: All Denaro templates ship with the same UI atom set.
- Extendable: You can create your own atoms and add them here.
- Documentation: See Documentation/Components.pdf for a higher-level overview.