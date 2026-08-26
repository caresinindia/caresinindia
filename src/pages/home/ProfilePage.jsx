import {
  Activity,
  Calendar,
  Clock,
  Edit3,
  FileText,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button';
import Container from '../../components/common/Container';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample user profile state for demonstration
  const [userProfile] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '15 Aug 1992',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '104, Green Valley Heights, Sector 62, Noida, Uttar Pradesh, 201309',
    emergencyContact: '+91 98111 22334 (Spouse - Priya Sharma)',
    insuranceProvider: 'Star Health & Allied Insurance',
    policyNumber: 'SH-IND-2024-998877',
  });

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Priya Sharma',
      speciality: 'Cardiologist',
      hospital: 'Apollo Hospital, Delhi',
      date: 'Aug 28, 2026',
      time: '10:30 AM',
      status: 'Confirmed',
    },
    {
      id: 2,
      doctor: 'Dr. Arvind Kumar',
      speciality: 'Dermatologist',
      hospital: 'Max Super Speciality, Saket',
      date: 'Sep 05, 2026',
      time: '02:00 PM',
      status: 'Scheduled',
    },
  ];

  const medicalHistory = [
    {
      id: 1,
      title: 'Annual Comprehensive Health Checkup',
      date: 'Jul 12, 2026',
      doctor: 'Dr. Neha Gupta (General Physician)',
      status: 'Normal',
    },
    {
      id: 2,
      title: 'Blood Pressure & ECG Screening',
      date: 'Apr 20, 2026',
      doctor: 'Dr. Priya Sharma (Cardiology)',
      status: 'Normal',
    },
  ];

  return (
    <div className="min-h-[85vh] bg-slate-50 py-10">
      <Container>
        {/* Profile Header Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 sm:h-40" />

          <div className="relative px-6 pb-6 pt-0 sm:px-8">
            <div className="flex flex-col items-start gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-blue-600 shadow-md">
                  <User className="h-14 w-14" />
                </div>

                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      {userProfile.name}
                    </h1>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                      Verified Patient
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    Patient ID: <span className="font-mono text-slate-700">#HC-IND-90214</span>
                  </p>
                </div>
              </div>

              <div className="flex w-full gap-3 sm:w-auto">
                <Link to="/book-appointment" className="flex-1 sm:flex-none">
                  <Button variant="primary" className="w-full">
                    Book New Appointment
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-xl bg-slate-50 p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-medium">Blood Group</span>
                </div>
                <p className="mt-1 text-lg font-bold text-slate-900">{userProfile.bloodGroup}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium">Appointments</span>
                </div>
                <p className="mt-1 text-lg font-bold text-slate-900">{upcomingAppointments.length} Upcoming</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <FileText className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-medium">Medical Reports</span>
                </div>
                <p className="mt-1 text-lg font-bold text-slate-900">4 Saved</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 sm:p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-medium">Insurance</span>
                </div>
                <p className="mt-1 text-sm font-bold text-slate-900 truncate" title={userProfile.insuranceProvider}>
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex gap-2 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Personal Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('appointments')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'appointments'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Appointments ({upcomingAppointments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('medical')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'medical'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Medical Records
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Contact & Personal Details Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit
                  </button>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Email Address</p>
                      <p className="font-medium text-slate-800">{userProfile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Phone Number</p>
                      <p className="font-medium text-slate-800">{userProfile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Date of Birth & Gender</p>
                      <p className="font-medium text-slate-800">
                        {userProfile.dateOfBirth} • {userProfile.gender}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Address</p>
                      <p className="font-medium text-slate-800">{userProfile.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency & Insurance Details */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="border-b border-slate-100 pb-4 text-lg font-semibold text-slate-900">
                    Emergency Contact
                  </h2>
                  <div className="mt-4">
                    <p className="text-xs text-slate-500">Primary Contact</p>
                    <p className="mt-1 font-medium text-slate-800">{userProfile.emergencyContact}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="border-b border-slate-100 pb-4 text-lg font-semibold text-slate-900">
                    Insurance Information
                  </h2>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-xs text-slate-500">Provider</p>
                      <p className="font-medium text-slate-800">{userProfile.insuranceProvider}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Policy Number</p>
                      <p className="font-mono text-sm font-medium text-slate-800">
                        {userProfile.policyNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-semibold text-slate-900">Upcoming Appointments</h2>
                <Link to="/book-appointment">
                  <Button variant="secondary" className="!py-1.5 !px-3 text-xs">
                    + Book Appointment
                  </Button>
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-blue-300 hover:bg-blue-50/20 sm:flex-row sm:items-center"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{appointment.doctor}</h3>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                          {appointment.speciality}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{appointment.hospital}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {appointment.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {appointment.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                        {appointment.status}
                      </span>
                      <Button variant="outline" className="!py-1.5 !px-3 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'medical' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-semibold text-slate-900">Medical History & Records</h2>
                <Button variant="secondary" className="!py-1.5 !px-3 text-xs">
                  Upload Record
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                {medicalHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-slate-300 sm:flex-row sm:items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.doctor}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="!py-1.5 !px-3 text-xs">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default ProfilePage;
