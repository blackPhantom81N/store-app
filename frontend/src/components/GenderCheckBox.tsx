import React from "react";

interface GenderProps {
  onCheckBoxChange: (gender: string) => void;
  selectedGender: string;
}

const GenderCheckBox: React.FC<GenderProps> = ({
  onCheckBoxChange,
  selectedGender,
}): JSX.Element => {
  return (
    <div className="flex space-x-4">
      {/* Male Checkbox */}
      <div className="form-control">
        <label
          className={`flex items-center gap-2 cursor-pointer ${
            selectedGender === "male" ? "text-blue-600" : ""
          }`}
        >
          <span className="text-sm">Male</span>
          <input
            type="checkbox"
            className="checkbox border-gray-900"
            checked={selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
          />
        </label>
      </div>

      {/* Female Checkbox */}
      <div className="form-control">
        <label
          className={`flex items-center gap-2 cursor-pointer ${
            selectedGender === "female" ? "text-pink-600" : ""
          }`}
        >
          <span className="text-sm">Female</span>
          <input
            type="checkbox"
            className="checkbox border-gray-900"
            checked={selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
