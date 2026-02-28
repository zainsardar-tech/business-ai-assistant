import React, { useState } from 'react';
import { UploadCloud, FileType, CheckCircle, Clock } from 'lucide-react';

const DocumentManager = () => {
    const [dragActive, setDragActive] = useState(false);
    const [documents, setDocuments] = useState([
        { id: 1, name: 'Q1_Financial_Report.pdf', status: 'indexed', date: '2 hours ago' },
        { id: 2, name: 'Employee_Handbook_2024.pdf', status: 'indexed', date: '1 day ago' },
        { id: 3, name: 'inventory_export.csv', status: 'processing', date: 'Just now' },
    ]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Fake upload
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file) => {
        const newDoc = {
            id: Date.now(),
            name: file.name,
            status: 'processing',
            date: 'Just now'
        };
        setDocuments(prev => [newDoc, ...prev]);

        // Simulate processing completion
        setTimeout(() => {
            setDocuments(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: 'indexed' } : d));
        }, 3000);
    };

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto animate-fade-in text-left">
            <header className="mb-8 flex justify-between items-end text-left border-b border-dark-border pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Knowledge Base</h1>
                    <p className="text-slate-400">Upload documents to expand the AI's contextual knowledge.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1 border-r-0 lg:border-r border-dark-border lg:pr-8">
                    <h2 className="text-xl font-bold text-white mb-4">Upload Files</h2>

                    <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive ? 'border-brand-500 bg-brand-500/5' : 'border-slate-700 hover:border-brand-400 hover:bg-slate-800/50'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-brand-400' : 'text-slate-500'}`} />
                        <p className="text-slate-300 font-medium mb-1">Drag and drop your files here</p>
                        <p className="text-sm text-slate-500 mb-6">Supports PDF, CSV, and TXT (Max 50MB)</p>

                        <label className="btn-secondary cursor-pointer inline-flex items-center">
                            <span>Browse Files</span>
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.csv,.txt"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        handleFile(e.target.files[0]);
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-white mb-4">Document Library</h2>
                    <div className="glass-card overflow-hidden">

                        <div className="divide-y divide-dark-border">
                            {documents.map((doc) => (
                                <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-colors">
                                            <FileType className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-200">{doc.name}</p>
                                            <p className="text-xs text-slate-500 mt-1">Uploaded {doc.date}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {doc.status === 'indexed' ? (
                                            <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                                                <CheckCircle className="w-3 h-3 mr-1" /> Ready
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                                                <Clock className="w-3 h-3 mr-1" /> Processing
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default DocumentManager;
