import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary'];

const Profile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    preferredName: '',
    employeeID: '',
    email: '',
    occupation: '',
    gender: '',
    nationality: '',
    dateOfBirth: '',
    phone: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    department: '',
    team: '',
    jobTitle: '',
    employmentType: '',
    manager: '',
    workLocation: '',
    employmentStatus: '',
  });

  const [loading, setLoading] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);

  const role = user?.role || 'employee';
  const isEmployee = role === 'employee';

  const lockedFields = isEmployee
    ? ['employeeID', 'occupation', 'gender', 'manager', 'department',
      'team','jobTitle','employmentType','workLocation','employmentStatus',]
    : [];

  const isLocked = (field) => lockedFields.includes(field);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setFormData((prev) => ({
          ...prev,
          firstname: response.data.firstname || '',
          middlename: response.data.middlename || '',
          lastname: response.data.lastname || '',
          preferredName: response.data.preferredName || '',
          employeeID: response.data.employeeID || '',
          email: response.data.email || '',
          occupation: response.data.occupation || '',
          gender: response.data.gender || '',
          nationality: response.data.nationality || '',
          dateOfBirth: response.data.dateOfBirth || '',
          phone: response.data.phone || '',
          emergencyContactName: response.data.emergencyContactName || '',
          emergencyContactNumber: response.data.emergencyContactNumber || '',
          address: response.data.address || '',
          city: response.data.city || '',
          state: response.data.state || '',
          country: response.data.country || '',
          department: response.data.department || '',
          team: response.data.team || '',
          jobTitle: response.data.jobTitle || '',
          employmentType: response.data.employmentType || '',
          manager: response.data.manager || '',
          workLocation: response.data.workLocation || '',
          employmentStatus: response.data.employmentStatus || '',

        }));
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
       await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
     
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  const inputClass =
    'w-full h-10 rounded-xl border border-slate-300 px-4 text-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white';

  const lockedInputClass =
    'w-full h-10 rounded-xl border border-slate-300 px-4 text-lg bg-gray-100 text-gray-400 cursor-not-allowed';

  const labelClass = 'block text-[15px] font-semibold text-slate-800 mb-1.5';

  return (
    <div className="w-full p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full"
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">My Account</h1>
            <p className="mt-3 text-slate-600 text-xl">
              Required to save as your personal detail.
            </p>

            {isEmployee && (
              <div className="mt-5 inline-block px-4 py-2 rounded-xl bg-yellow-50 border border-yellow-300 text-sm text-yellow-800">
                🔒 Some fields are managed by admin and cannot be edited.
              </div>
            )}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-52 h-52 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              <span className="text-7xl">👨</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Middle Name</label>
              <input
                type="text"
                name="middlename"
                value={formData.middlename}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Preferred Name</label>
              <input
                type="text"
                name="preferredName"
                value={formData.preferredName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Gender</label>

              {isLocked('gender') ? (
                <div className="relative">
                  <input
                    type="text"
                    value={formData.gender}
                    readOnly
                    className={lockedInputClass}
                    placeholder="Gender"
                  />
                  <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                </div>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setGenderOpen(!genderOpen)}
                    className={`${inputClass} text-left flex justify-between items-center`}
                  >
                    <span className={formData.gender ? 'text-gray-800' : 'text-gray-400'}>
                      {formData.gender || 'Select Gender'}
                    </span>
                    <span className="text-gray-400 text-xs">{genderOpen ? '▲' : '▼'}</span>
                  </button>

                  {genderOpen && (
                    <div className="absolute z-10 w-full bg-white border rounded-xl shadow-lg mt-1">
                      {GENDER_OPTIONS.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setFormData({ ...formData, gender: opt });
                            setGenderOpen(false);
                          }}
                          className={`p-3 cursor-pointer hover:bg-blue-50 ${
                            formData.gender === opt
                              ? 'bg-blue-100 font-semibold text-blue-700'
                              : ''
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className={labelClass}>Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Date Of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={inputClass}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div>
              <label className={labelClass}>Occupation</label>
              <div className="relative">
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  readOnly={isLocked('occupation')}
                  className={isLocked('occupation') ? lockedInputClass : inputClass}
                />
                {isLocked('occupation') && (
                  <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>E-mail</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Emergency Contact Number</label>
              <input
                type="text"
                name="emergencyContactNumber"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="xl:col-span-2">
              <label className={labelClass}>Home Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Employment Information */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Employment Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            <div>
              <label className={labelClass}>Employee ID</label>
              <div className="relative">
                <input
                  type="text"
                  name="employeeID"
                  value={formData.employeeID}
                  onChange={handleChange}
                  readOnly={isLocked('employeeID')}
                  className={isLocked('employeeID') ? lockedInputClass : inputClass}
                />
                {isLocked('employeeID') && (
                  <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>Department</label>
              <div className='relative'>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  readOnly={isLocked('department')}
                  onChange={handleChange}
                  className={isLocked('department') ? lockedInputClass : inputClass}
                />
                {isLocked('department') && (
                    <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                  )}
                </div>
            </div>

            <div>
              <label className={labelClass}>Team</label>
              <div className='relative'>
                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  readOnly={isLocked('team')}
                  onChange={handleChange}
                  className={isLocked('team') ? lockedInputClass : inputClass}
                />
                {isLocked('team') && (
                    <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                  )}
              </div>
            </div>

            <div>
              <label className={labelClass}>Job Title</label>
               <div className='relative'> 
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className={isLocked('jobTitle') ? lockedInputClass : inputClass}
                />
                {isLocked('jobTitle') && (
                    <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                  )}
                </div>
            </div>

            <div>
              <label className={labelClass}>Employment Type</label>
               < div className='relative'>
                <select
                  type="text"
                  name="employmentType"
                  value={formData.employmentType}
                  disabled={isLocked('employmentType')}
                  onChange={handleChange}
                  className={`${inputClass} ${
                    isLocked('employmentType')
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <option value="">Select Type</option>
                  <option value="Fulltime">Full Time</option>
                  <option value="Parttime">Part Time</option>
                  <option value="Casual">Casual</option>
                </select>
                {isLocked('employmentType')}
                </div>
            </div>
          </div>





          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Manager</label>
              <div className="relative">
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  readOnly={isLocked('manager')}
                  className={isLocked('manager') ? lockedInputClass : inputClass}
                />
                {isLocked('manager') && (
                  <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>Work Location</label>
              <div className="relative">
                <input
                  type="text"
                  name="workLocation"
                  value={formData.workLocation}
                  readOnly={isLocked('workLocation')}
                  onChange={handleChange}
                  className={isLocked('workLocation') ? lockedInputClass : inputClass}
                />
                {isLocked('workLocation') && (
                    <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                  )}
                </div>
            </div>

            <div>
              <label className={labelClass}>Employment Status</label>
               <div className="relative">
                <select
                  
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  disabled={isLocked('employmentStatus')}
                  className={`${inputClass} ${
                    isLocked('employmentStatus')
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  {isLocked('employmentStatus') 
                  }
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            className="h-14 px-8 rounded-2xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;