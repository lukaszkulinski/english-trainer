
import { Language } from "../types";

type TranslationKey = string;
type Translations = Record<TranslationKey, Record<Language, string>>;

export const TRANSLATIONS: Translations = {
  // --- Layout & Navigation ---
  "app_name": { en: "GrammarGenius", pl: "MistrzGramatyki" },
  "nav_learn": { en: "Learn", pl: "Nauka" },
  "nav_path": { en: "Path", pl: "Ścieżka" },
  "nav_practice": { en: "Practice", pl: "Trening" },
  "nav_write": { en: "Write", pl: "Pisanie" },
  "nav_tutor": { en: "Tutor", pl: "Nauczyciel" },
  
  // --- Dashboard ---
  "tab_tenses": { en: "12 Tenses", pl: "12 Czasów" },
  "tab_advanced": { en: "Advanced", pl: "Zaawansowane" },
  "tab_vocab": { en: "Vocab", pl: "Słówka" },
  "tense_matrix_title": { en: "Tense Matrix", pl: "Matryca Czasów" },
  "tense_matrix_subtitle_mobile": { en: "Select a timeframe to explore tenses.", pl: "Wybierz okres czasu, aby zobaczyć czasy." },
  "tense_matrix_subtitle_desktop": { en: "Tap any tense to learn more.", pl: "Kliknij dowolny czas, aby dowiedzieć się więcej." },
  
  // --- Tense Categories ---
  "Past": { en: "Past", pl: "Przeszłość" },
  "Present": { en: "Present", pl: "Teraźniejszość" },
  "Future": { en: "Future", pl: "Przyszłość" },
  "Simple": { en: "Simple", pl: "Simple" },
  "Continuous": { en: "Continuous", pl: "Continuous" },
  "Perfect": { en: "Perfect", pl: "Perfect" },
  "Perfect Continuous": { en: "Perfect Continuous", pl: "Perfect Continuous" },

  // --- Modal / Lesson Cards ---
  "usage_label": { en: "Usage", pl: "Użycie" },
  "example_label": { en: "Example", pl: "Przykład" },
  "gemini_explanation": { en: "Gemini Explanation", pl: "Wyjaśnienie Gemini" },
  "btn_practice_now": { en: "Practice Now", pl: "Ćwicz Teraz" },
  "btn_explain_ai": { en: "Explain with AI", pl: "Wyjaśnij z AI" },
  "btn_regenerate": { en: "Regenerate", pl: "Wygeneruj ponownie" },
  
  // --- Grammar Library ---
  "advanced_grammar_title": { en: "Advanced Grammar", pl: "Gramatyka Zaawansowana" },
  "advanced_grammar_subtitle": { en: "Deep dive into concepts beyond tenses.", pl: "Zgłębij tematy wykraczające poza czasy." },
  "grammar_module": { en: "Grammar Module", pl: "Moduł Gramatyczny" },
  "description_label": { en: "Description", pl: "Opis" },
  
  // --- Vocabulary Panel ---
  "vocab_title": { en: "Vocabulary Builder", pl: "Rozbudowa Słownictwa" },
  "vocab_subtitle": { en: "Expand your lexicon with translation challenges and verb form drills.", pl: "Poszerzaj słownictwo poprzez tłumaczenia i ćwiczenia czasowników." },
  "pl_en_desc": { en: "Translate words from Polish to English.", pl: "Tłumacz słowa z polskiego na angielski." },
  "en_pl_desc": { en: "Translate words from English to Polish.", pl: "Tłumacz słowa z angielskiego na polski." },
  "requires_verb_forms": { en: "⚠️ Requires all 3 forms for verbs!", pl: "⚠️ Wymaga 3 form czasownika!" },
  "focus_meaning": { en: "Focus on meaning & recall", pl: "Skupienie na znaczeniu i pamięci" },
  "btn_start_practice": { en: "Start Practice", pl: "Rozpocznij Trening" },

  // --- Practice Arena ---
  "session_setup": { en: "Session Setup", pl: "Konfiguracja Sesji" },
  "lbl_topic": { en: "Topic", pl: "Temat" },
  "lbl_selected": { en: "Selected", pl: "Wybrany" },
  "lbl_mixed": { en: "Mixed", pl: "Mieszany" },
  "lbl_difficulty": { en: "Difficulty", pl: "Trudność" },
  "lbl_questions": { en: "Questions", pl: "Liczba pytań" },
  "btn_back": { en: "Back", pl: "Wróć" },
  "btn_start": { en: "Start", pl: "Start" },
  "loading_session": { en: "Gemini is preparing your session...", pl: "Gemini przygotowuje Twoją sesję..." },
  "error_title": { en: "Oops!", pl: "Ups!" },
  "btn_try_again": { en: "Try Again", pl: "Spróbuj Ponownie" },
  "btn_go_back": { en: "Go Back", pl: "Wróć" },
  "quiz_complete": { en: "Session Complete!", pl: "Sesja Zakończona!" },
  "performance_summary": { en: "Here is your performance summary", pl: "Oto podsumowanie Twoich wyników" },
  "score_result": { en: "You got", pl: "Uzyskałeś" },
  "out_of": { en: "out of", pl: "na" },
  "correct": { en: "correct", pl: "poprawnych" },
  "btn_dashboard": { en: "Dashboard", pl: "Panel" },
  "btn_retry": { en: "Retry", pl: "Powtórz" },
  "q_grammar": { en: "Grammar", pl: "Gramatyka" },
  "q_vocab": { en: "Vocab", pl: "Słownictwo" },
  "translate_to": { en: "Translate to", pl: "Przetłumacz na" },
  "provide_3_forms": { en: "(Provide all 3 forms: Base, Past, Participle)", pl: "(Podaj 3 formy: Podstawowa, Przeszła, Imiesłów)" },
  "type_answer": { en: "Type answer...", pl: "Wpisz odpowiedź..." },
  "base_form": { en: "Base Form", pl: "Podstawowa" },
  "past_simple": { en: "Past Simple", pl: "Przeszły" },
  "past_participle": { en: "Past Participle", pl: "Imiesłów" },
  "btn_check": { en: "Check Answer", pl: "Sprawdź" },
  "btn_next_question": { en: "Next Question", pl: "Następne Pytanie" },
  "btn_view_results": { en: "View Results", pl: "Zobacz Wyniki" },
  "explanation_label": { en: "Explanation", pl: "Wyjaśnienie" },

  // --- Writing Arena ---
  "writing_challenge": { en: "Writing Challenge", pl: "Wyzwanie Pisarskie" },
  "writing_subtitle": { en: "Practice your writing skills with AI feedback.", pl: "Ćwicz pisanie z informacją zwrotną od AI." },
  "lbl_select_level": { en: "Select Level", pl: "Wybierz Poziom" },
  "lbl_target_length": { en: "Target Length", pl: "Długość tekstu" },
  "btn_generate_topic": { en: "Generate Topic", pl: "Generuj Temat" },
  "creating_topic": { en: "Creating a Topic...", pl: "Tworzenie Tematu..." },
  "analyzing_text": { en: "Analyzing your Text...", pl: "Analizowanie Tekstu..." },
  "btn_cancel": { en: "Cancel", pl: "Anuluj" },
  "your_topic": { en: "Your Topic", pl: "Twój Temat" },
  "placeholder_writing": { en: "Start writing here...", pl: "Zacznij pisać tutaj..." },
  "btn_submit": { en: "Submit", pl: "Wyślij" },
  "results_title": { en: "Results", pl: "Wyniki" },
  "btn_new_topic": { en: "New Topic", pl: "Nowy Temat" },
  "overall": { en: "Overall", pl: "Ogólnie" },
  "grammar": { en: "Grammar", pl: "Gramatyka" },
  "vocabulary": { en: "Vocabulary", pl: "Słownictwo" },
  "relevance": { en: "Relevance", pl: "Trafność" },
  "general_feedback": { en: "General Feedback", pl: "Ogólna Opinia" },
  "suggested_improvements": { en: "Suggested Improvements", pl: "Sugerowane Poprawki" },
  "original": { en: "Original", pl: "Oryginał" },
  "better": { en: "Better", pl: "Lepiej" },
  "perfect_title": { en: "Perfect!", pl: "Doskonale!" },
  "perfect_msg": { en: "We couldn't find any major errors in your text. Great job!", pl: "Nie znaleźliśmy żadnych większych błędów. Świetna robota!" },
  "review_required": { en: "Review Required", pl: "Wymaga Przejrzenia" },
  "review_msg": { en: "Your text received a low score, but we couldn't generate specific corrections.", pl: "Twój tekst otrzymał niską ocenę, ale nie mogliśmy wygenerować konkretnych poprawek." },
  "return_dashboard": { en: "Return to Dashboard", pl: "Wróć do Panelu" },

  // --- Curriculum ---
  "study_path": { en: "Study Path", pl: "Ścieżka Nauki" },
  "study_subtitle": { en: "Master English step-by-step from A1 to C2.", pl: "Opanuj angielski krok po kroku od A1 do C2." },
  "beginner": { en: "Beginner", pl: "Początkujący" },
  "intermediate": { en: "Intermediate", pl: "Średniozaawansowany" },
  "advanced": { en: "Advanced", pl: "Zaawansowany" },
  "lessons_count": { en: "Lessons", pl: "Lekcji" },

  // --- Lesson View ---
  "back_to_path": { en: "Back to Path", pl: "Powrót do Ścieżki" },
  "opening_lesson": { en: "Opening lesson...", pl: "Otwieranie lekcji..." },
  "previous": { en: "Previous", pl: "Poprzednia" },
  "up_next": { en: "Up Next", pl: "Następna" },
  "btn_prev": { en: "Prev", pl: "Wstecz" },
  "btn_next": { en: "Next", pl: "Dalej" },
  "finished": { en: "Finished", pl: "Koniec" },
  "ready_practice": { en: "Ready to Practice?", pl: "Gotowy do ćwiczeń?" },
  "take_quiz": { en: "Take a Quiz", pl: "Rozwiąż Quiz" },
  "quiz_desc": { en: "Test your memory on this topic.", pl: "Sprawdź swoją pamięć z tego tematu." },
  "writing_task": { en: "Writing Task", pl: "Zadanie Pisemne" },
  "writing_desc": { en: "Write a short text.", pl: "Napisz krótki tekst." },
  "stuck_title": { en: "Stuck?", pl: "Utknąłeś?" },
  "stuck_desc": { en: "You can switch to the Tutor tab at any time to ask Prof. Gemini specifically about", pl: "Możesz w każdej chwili przejść do zakładki Nauczyciel, aby zapytać Prof. Gemini o" },
  "practice_lesson_mobile": { en: "Practice this lesson", pl: "Przećwicz tę lekcję" },

  // --- Lesson Components ---
  "protip": { en: "Pro Tip", pl: "Wskazówka" },
  "dont_say": { en: "Don't say", pl: "Nie mów" },
  "say_instead": { en: "Say instead", pl: "Powiedz tak" },
  "reason": { en: "Reason", pl: "Powód" },
  
  // --- Irregular Verbs ---
  "irregular_verbs_title": { en: "Irregular Verbs", pl: "Czasowniki Nieregularne" },
  "irregular_verbs_subtitle": { en: "Reference list of verb forms.", pl: "Lista form czasowników." },
  "search_placeholder": { en: "Search (e.g., 'go', 'went')...", pl: "Szukaj (np. 'go', 'went')..." },
  "no_verbs_found": { en: "No verbs found matching", pl: "Nie znaleziono czasowników pasujących do" },
  "showing_verbs": { en: "Showing", pl: "Pokazuję" },
  "verbs_count": { en: "verbs", pl: "czasowników" },

  // --- AI Tutor ---
  "tutor_name": { en: "Prof. Gemini", pl: "Prof. Gemini" },
  "tutor_role": { en: "AI Grammar Tutor", pl: "Nauczyciel Gramatyki AI" },
  "clear_chat": { en: "Clear Chat", pl: "Wyczyść czat" },
  "thinking": { en: "Thinking...", pl: "Myślę..." },
  "ask_question": { en: "Ask a question...", pl: "Zadaj pytanie..." },
  "tutor_welcome": { 
    en: "Hello! I'm Professor Gemini. I can help you with English grammar, explain tricky tenses, or check your sentences. What would you like to learn today?", 
    pl: "Cześć! Jestem Profesor Gemini. Pomogę Ci z angielską gramatyką, wyjaśnię trudne czasy lub sprawdzę Twoje zdania. Czego chciałbyś się dzisiaj nauczyć?" 
  },
  "chat_cleared": { en: "Chat cleared. How can I help you now?", pl: "Czat wyczyszczony. W czym mogę pomóc teraz?" },
  "connection_error": { en: "Sorry, I encountered a connection error. Please try again.", pl: "Przepraszam, wystąpił błąd połączenia. Spróbuj ponownie." },

  // --- Common Words ---
  "beginner_lvl": { en: "beginner", pl: "początkujący" },
  "intermediate_lvl": { en: "intermediate", pl: "średni" },
  "advanced_lvl": { en: "advanced", pl: "zaawansowany" },
  "short": { en: "Short", pl: "Krótki" },
  "medium": { en: "Medium", pl: "Średni" },
  "long": { en: "Long", pl: "Długi" }
};
