// js/data-manager.js
import { SUBJECTS_META } from './config.js';

export class DataManager {
    constructor() {
        this.questionDatabase = {};
        this.loaded = false;
    }

    async loadSubjectData(subjectKey) {
        if (this.questionDatabase[subjectKey]) {
            return this.questionDatabase[subjectKey];
        }

        try {
            const meta = SUBJECTS_META[subjectKey];
            if (!meta) throw new Error(`Subject ${subjectKey} not found`);

            const response = await fetch(meta.dataFile);
            if (!response.ok) throw new Error(`Failed to load ${subjectKey} data`);
            
            const data = await response.json();
            this.questionDatabase[subjectKey] = {
                meta: meta,
                topics: data.topics
            };

            return this.questionDatabase[subjectKey];
        } catch (error) {
            console.error(`Error loading ${subjectKey}:`, error);
            return null;
        }
    }

    async loadAllSubjects() {
        const promises = Object.keys(SUBJECTS_META).map(key => this.loadSubjectData(key));
        await Promise.all(promises);
        this.loaded = true;
    }

    getSubject(subjectKey) {
        return this.questionDatabase[subjectKey];
    }

    getTopic(subjectKey, topicKey) {
        const subject = this.getSubject(subjectKey);
        return subject?.topics[topicKey];
    }

    getQuestions(subjectKey, topicKey) {
        const topic = this.getTopic(subjectKey, topicKey);
        return topic?.questions || [];
    }

    getAllSubjects() {
        return this.questionDatabase;
    }
}