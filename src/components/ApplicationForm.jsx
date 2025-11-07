import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addApplication } from '../actions/applicationActions';
import useForm from '../hooks/useForm';
import { v4 as uuidv4 } from 'uuid';

const initialFormValues = {
  name: '',
  email: '',
  phone: '',
  experience: '',
  skills: [''],
  coverLetter: '',
  startDate: '',
};

const validateStep = (step, values) => {
  const errors = {};
  if (step === 1) {
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
  } else if (step === 2) {
    if (!values.experience) errors.experience = 'Experience is required';
    if (values.skills.length === 0 || values.skills.some(skill => !skill.trim())) {
      errors.skills = 'At least one skill is required';
    }
  } else if (step === 3) {
    if (!values.coverLetter) errors.coverLetter = 'Cover letter is required';
    if (!values.startDate) errors.startDate = 'Preferred start date is required';
  }
  return errors;
};

const ApplicationForm = () => {
  const { id } = useParams(); // job id
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const onSubmit = () => {
    const appId = uuidv4();
    dispatch(addApplication({
      id: appId,
      jobId: id,
      applicantName: values.name,
      experience: values.experience,
      skills: values.skills,
      coverLetter: values.coverLetter,
      startDate: values.startDate,
    }));
    navigate(`/applications/${appId}`);
  };

  const validate = (values) => validateStep(step, values);

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(initialFormValues, validate, onSubmit);

  const [localErrors, setErrors] = useState({});

  useEffect(() => {
    setErrors(errors);
  }, [errors]);

  const handleNext = () => {
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  // Handle dynamic skills array changes
  const handleSkillChange = (index, value) => {
    const newSkills = [...values.skills];
    newSkills[index] = value;
    setValues({ ...values, skills: newSkills });
  };

  const addSkill = () => {
    setValues({ ...values, skills: [...values.skills, ''] });
  };

  const removeSkill = (index) => {
    const newSkills = values.skills.filter((_, i) => i !== index);
    setValues({ ...values, skills: newSkills });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Application Form - Step {step}</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Name:</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
              {localErrors.name && <p className="text-red-600 text-sm">{localErrors.name}</p>}
            </div>
            <div>
              <label className="block font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
              {localErrors.email && <p className="text-red-600 text-sm">{localErrors.email}</p>}
            </div>
            <div>
              <label className="block font-semibold">Phone Number:</label>
              <input
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
              {localErrors.phone && <p className="text-red-600 text-sm">{localErrors.phone}</p>}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Years of Experience:</label>
              <input
                type="number"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
              {localErrors.experience && <p className="text-red-600 text-sm">{localErrors.experience}</p>}
            </div>
            <div>
              <label className="block font-semibold mb-2">Skills:</label>
              {values.skills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="border p-2 rounded flex-grow"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 bg-red-500 text-white px-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSkill}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add Skill
              </button>
              {localErrors.skills && <p className="text-red-600 text-sm mt-1">{localErrors.skills}</p>}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Cover Letter:</label>
              <textarea
                name="coverLetter"
                value={values.coverLetter}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                rows="4"
              />
              {localErrors.coverLetter && <p className="text-red-600 text-sm">{localErrors.coverLetter}</p>}
            </div>
            <div>
              <label className="block font-semibold">Preferred Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {localErrors.startDate && <p className="text-red-600 text-sm">{localErrors.startDate}</p>}
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
