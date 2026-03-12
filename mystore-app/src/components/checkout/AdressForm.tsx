import type { Address } from "../../modals/Customer";

interface AddressFormProps {
  title: string;
  address: Address;
  required?: boolean;
  errors?: Record<string, string>;
  prefix?: string;
  onChange: (field: keyof Address, value: string) => void;
}

const AddressForm = ({
  title,
  address,
  required = false,
    
  onChange
}: AddressFormProps) => {
  return (
    <div className="checkout-form__section">
      <h3>{title}</h3>

      <label>
        Civility
        <select
          value={address.civility}
          onChange={(e) => onChange("civility", e.target.value)}
          required={required}
        >
          <option value="">Select</option>
          <option value="mr">Mr.</option>
          <option value="ms">Ms.</option>
        </select>
      </label>

      <label>
        First Name
        <input
          type="text"
          value={address.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          required={required}
        />
        
      </label>

      <label>
        Last Name
        <input
          type="text"
          value={address.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          required={required}
        />
         
      </label>

      <label>
        Company Name
        <input
          type="text"
          value={address.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
        />
      </label>

      <label>
        Street Address
        <input
          type="text"
          value={address.street}
          onChange={(e) => onChange("street", e.target.value)}
          required={required}
        />
       
      </label>

      <label>
        Town / City
        <input
          type="text"
          value={address.city}
          onChange={(e) => onChange("city", e.target.value)}
          required={required}
        />
       
      </label>

      <label>
        State / County
        <input
          type="text"
          value={address.country}
          onChange={(e) => onChange("country", e.target.value)}
          required={required}
        />
        
      </label>

      <label>
        Postcode / ZIP
        <input
          type="text"
          value={address.zipCode}
          onChange={(e) => onChange("zipCode", e.target.value)}
          required={required}
        />
       
      </label>
    </div>
  );
};

export default AddressForm;