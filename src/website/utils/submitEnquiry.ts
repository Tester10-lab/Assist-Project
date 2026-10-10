import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export async function submitEnquiry(data: {
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  preferredTime?: string;
  urgency?: string;
  message: string;
  type: string;
}) {
  try {
    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...data,
      status: 'new',
      createdAt: new Date().toISOString()
    });
    return { accepted: true, id: docRef.id, message: 'Enquiry submitted successfully' };
  } catch (error: any) {
    console.error('Error adding document: ', error);
    return { accepted: false, error: error.message };
  }
}
