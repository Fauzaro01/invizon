import { collection, addDoc, getDocs, updateDoc, deleteDoc, query, where, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function addAnggota(data) {
    try {
      const anggotaRef = collection(db, "Projects/Invizon/Anggota");
      const docRef = await addDoc(anggotaRef, data);
      console.log("Anggota berhasil ditambahkan dengan ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Gagal menambahkan anggota:", error);
    }
  }

  export async function getAllAnggota() {
    try {
      const anggotaRef = collection(db, "Projects/Invizon/Anggota");
      const querySnapshot = await getDocs(anggotaRef);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Gagal mendapatkan daftar anggota:", error);
    }
  }

  export async function updateAnggota(id, data) {
    try {
      const anggotaDoc = doc(db, "Projects/Invizon/Anggota", id);
      await updateDoc(anggotaDoc, data);
      console.log("Anggota berhasil diperbarui");
    } catch (error) {
      console.error("Gagal memperbarui anggota:", error);
    }
  }

  export async function deleteAnggota(id) {
    try {
      const anggotaDoc = doc(db, "Projects/Invizon/Anggota", id);
      await deleteDoc(anggotaDoc);
      console.log("Anggota berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus anggota:", error);
    }
  }

  // Project


  export async function addProjectToAnggota(idAnggota, project) {
    try {
      const anggotaDoc = doc(db, "Projects/Invizon/Anggota", idAnggota);
      const anggotaSnap = await getDocs(anggotaDoc);
  
      if (!anggotaSnap.exists()) throw new Error("Anggota tidak ditemukan!");
  
      const anggotaData = anggotaSnap.data();
      const updatedProjects = [...(anggotaData.project || []), project];
  
      await updateDoc(anggotaDoc, { project: updatedProjects });
      console.log("Project berhasil ditambahkan");
    } catch (error) {
      console.error("Gagal menambahkan project:", error);
    }
  }

  export async function getProjectsByAnggota(idAnggota) {
    try {
      const anggotaDoc = doc(db, "Projects/Invizon/Anggota", idAnggota);
      const anggotaSnap = await getDocs(anggotaDoc);
  
      if (!anggotaSnap.exists()) throw new Error("Anggota tidak ditemukan!");
  
      return anggotaSnap.data().project || [];
    } catch (error) {
      console.error("Gagal mendapatkan project:", error);
    }
  }

  export async function updateProjectByAnggota(idAnggota, projectIndex, newProject) {
    try {
      const anggotaDoc = doc(db, "Projects/Invizon/Anggota", idAnggota);
      const anggotaSnap = await getDocs(anggotaDoc);
  
      if (!anggotaSnap.exists()) throw new Error("Anggota tidak ditemukan!");
  
      const anggotaData = anggotaSnap.data();
      const projects = anggotaData.project || [];
      if (projectIndex < 0 || projectIndex >= projects.length) throw new Error("Indeks Project tidak valid!");
  
      projects[projectIndex] = newProject;
  
      await updateDoc(anggotaDoc, { project: projects });
      console.log("Project berhasil diperbarui");
    } catch (error) {
      console.error("Gagal memperbarui project:", error);
    }
  }

  export async function deleteProjectByAnggota(idAnggota, projectIndex) {
    try {
      const anggotaDoc = doc(db, "Projects/Invizon/Anggota", idAnggota);
      const anggotaSnap = await getDocs(anggotaDoc);
  
      if (!anggotaSnap.exists()) throw new Error("Anggota tidak ditemukan!");
  
      const anggotaData = anggotaSnap.data();
      const projects = anggotaData.project || [];
      if (projectIndex < 0 || projectIndex >= projects.length) throw new Error("Indeks Project tidak valid!");
  
      projects.splice(projectIndex, 1);
  
      await updateDoc(anggotaDoc, { project: projects });
      console.log("Project berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus project:", error);
    }
  }

  export async function getAnggotaByKelompokId(kelompokId) {
    // console.log("kelompokId:", kelompokId); // Debugging line
    if (!kelompokId) {
      console.error("KelompokId tidak valid.");
      return [];
    }
  
    try {
      const anggotaRef = collection(db, "Projects/Invizon/Anggota");
      const q = query(anggotaRef, where("kelompokId", "==", kelompokId));
      const querySnapshot = await getDocs(q);
  
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Gagal mendapatkan anggota berdasarkan kelompokId:", error);
      return [];
    }
  }
  