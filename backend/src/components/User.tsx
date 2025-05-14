import {
    List,
    Datagrid,
    TextField,
    DeleteButton,
    EditButton,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    PasswordInput,
    ArrayField,
    SingleFieldList,
    ChipField,
    FunctionField,
} from "react-admin";

// LIST
export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="userId" label="User ID" />
            <TextField source="firstName" label="First Name" />
            <TextField source="lastName" label="Last Name" />
            <TextField source="mobileNumber" label="Mobile Number" />
            <TextField source="email" label="Email" />
            
            {/* Hiển thị các role dưới dạng chips */}
            <ArrayField source="roles">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>

            {/* Hiển thị các địa chỉ như 1 chuỗi */}
            <FunctionField
                label="Addresses"
                render={(record) =>
                    record.addresses?.map((a: any) => a.city || a.street || "N/A").join(", ")
                }
            />

            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// CREATE
export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="firstName" label="First Name" />
            <TextInput source="lastName" label="Last Name" />
            <TextInput source="mobileNumber" label="Mobile Number" />
            <TextInput source="email" label="Email" />
            <PasswordInput source="password" label="Password" />
            {/* Bạn có thể để server tự gán roles và addresses, hoặc thêm UI custom sau */}
        </SimpleForm>
    </Create>
);

// EDIT
export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="firstName" label="First Name" />
            <TextInput source="lastName" label="Last Name" />
            <TextInput source="mobileNumber" label="Mobile Number" />
            <TextInput source="email" label="Email" />
            <PasswordInput source="password" label="Password" />
            {/* roles và addresses chỉ xem, không chỉnh sửa ở đây */}
        </SimpleForm>
    </Edit>
);
