import { arrayRemove, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../src/config/Firebase";

///////////////////////  Delete Image ///////////////////////


const deleteImage = async (image, path, documentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (confirmDelete) {
        // Delete from Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, path);

        try {
            await deleteObject(imageRef);
        } catch (error) {
            console.error('Failed to delete image from Firebase Storage', error);
            return;  // If the image deletion fails, don't update Firestore
        }

        // Delete from Firestore
        const db = getFirestore();
        const docRef = doc(db, "portfolio", documentId);

        await updateDoc(docRef, {
            img: arrayRemove(image),
            imagePath: arrayRemove(path)
        });
        alert('Image deleted successfully');
    }
};


const renderImages = (docData, adminMode, setMainImage, documentId, newImages, setNewImages, newImagesUrl, setNewImagesURL) => {

    return (
        <div className="imageView__preview">
            {docData.img.map((image, index) => {
                const path = docData.imagePath[index];
                return (
                    <div key={index} className="imageView__thumbnail-container"
                        onClick={() => setMainImage(image)}
                    >
                        {adminMode ?
                            <div className="button__deleteImage" onClick={() => portfolio.deleteImage(image, path, documentId)}>
                                <ion-icon style={{ color: 'red' }} name="trash-outline"></ion-icon>
                            </div> : null}
                        <img src={image} alt={docData.name} className="imageView__thumbnail" />
                    </div>

                )
            })}
            {adminMode ?
                <div className="form-admin__image">
                    <input onChange={() => handleChangeFile(event, setNewImages, setNewImagesURL)}
                        type="file" id="img"
                        name="img"
                        placeholder="Image"
                        className="form-input mb-medium"
                        required />
                    {newImagesUrl ?
                        <div className="imageView__thumbnail-container">
                            <div className="button__deleteImage" onClick={() => addImage()}>
                                <ion-icon style={{ color: 'green' }} name="add-circle"></ion-icon>
                            </div>
                            <img src={newImagesUrl} alt="" className="form-admin__image-preview" />
                        </div>
                        : null}
                </div>


                : null}



        </div>
    )
}

const handleDelete = async (docData, navigate) => {
    try {
        const q = query(collection(db, "portfolio"), where("id", "==", docData.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        navigate('/portfolio');
    } catch (e) {
        console.log(e);
    }
};
import { arrayUnion } from "firebase/firestore";

const handleEdit = async (setLoading, docData, textForTextarea, formTitle, newImages, setNewImages) => {
    setLoading(true);
    let imageUrl = null;
    let imagePath = null;
    let updateData = {
        name: formTitle,
        description: textForTextarea.split('\n')
    };

    if (newImages) {
        const storageRef = ref(storage, `images/${newImages.name}`);
        await uploadBytes(storageRef, newImages);
        imageUrl = await getDownloadURL(storageRef);
        imagePath = `images/${newImages.name}`;
        updateData.img = arrayUnion(imageUrl);
        updateData.imagePath = arrayUnion(imagePath);
    }

    try {
        const q = query(collection(db, "portfolio"), where("id", "==", docData.id));
        const querySnapshot = await getDocs(q);
        await Promise.all(querySnapshot.docs.map((doc) => updateDoc(doc.ref, updateData)));
        setLoading(false);
        setNewImages(null);
    } catch (e) {
        console.log(e);
    }
};

const handleChangeFile = (event, setNewImages, setNewImagesURL) => {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setNewImagesURL(imageUrl);
        setNewImages(file);
    } else {
        setNewImagesURL(null);
        setNewImages(null);
    }
}

const addImage = () => {

}

export const portfolio = {
    deleteImage,
    renderImages,
    handleDelete,
    handleEdit,
    handleChangeFile
};