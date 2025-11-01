import unittest
from datetime import datetime, timedelta
import statistics
from typing import Dict, List, Set, Any

# ==================== EDTECH MODULES ====================

class AdaptiveLearningEngine:
    """Adaptive learning system with static analytics"""
    
    def __init__(self):
        self.concept_mastery = {}
    
    def assess_student_performance(self, student_id: str, concept: str, score: float) -> Dict:
        """Use function attributes to simulate static variables"""
        if not hasattr(self.assess_student_performance, 'global_stats'):
            # Static initialization - runs only once
            self.assess_student_performance.global_stats = {
                'total_assessments': 0,
                'concept_difficulty': {},
                'student_performance': {},
                'assessment_history': []
            }
        
        stats = self.assess_student_performance.global_stats
        stats['total_assessments'] += 1
        
        # Track concept difficulty
        if concept not in stats['concept_difficulty']:
            stats['concept_difficulty'][concept] = {
                'total_score': 0.0,
                'attempts': 0,
                'students': set()
            }
        
        concept_stats = stats['concept_difficulty'][concept]
        concept_stats['total_score'] += score
        concept_stats['attempts'] += 1
        concept_stats['students'].add(student_id)
        
        # Calculate global difficulty (0=easy, 1=hard)
        global_difficulty = 1 - (concept_stats['total_score'] / (concept_stats['attempts'] * 100))
        
        # Update student's personal mastery
        if student_id not in self.concept_mastery:
            self.concept_mastery[student_id] = {}
        
        self.concept_mastery[student_id][concept] = score / 100
        
        # Record assessment history
        stats['assessment_history'].append({
            'student_id': student_id,
            'concept': concept,
            'score': score,
            'timestamp': datetime.now()
        })
        
        return {
            'student_mastery': self.concept_mastery[student_id][concept],
            'global_difficulty': global_difficulty,
            'total_assessments': stats['total_assessments'],
            'concept_attempts': concept_stats['attempts'],
            'unique_students_for_concept': len(concept_stats['students'])
        }
    
    def get_global_stats(self) -> Dict:
        """Get comprehensive global statistics"""
        if not hasattr(self.assess_student_performance, 'global_stats'):
            return {}
        return self.assess_student_performance.global_stats
    
    def reset_global_stats(self):
        """Reset static statistics (for testing)"""
        if hasattr(self.assess_student_performance, 'global_stats'):
            delattr(self.assess_student_performance, 'global_stats')


class StudentEngagementTracker:
    """Track student engagement with static analytics"""
    
    def __init__(self):
        if not hasattr(StudentEngagementTracker, 'engagement_data'):
            # Class-level static variable
            StudentEngagementTracker.engagement_data = {
                'total_sessions': 0,
                'total_time_minutes': 0,
                'active_students': set(),
                'session_history': [],
                'daily_engagement': {}
            }
    
    def record_session(self, student_id: str, duration_minutes: int, activity_type: str) -> Dict:
        data = StudentEngagementTracker.engagement_data
        data['total_sessions'] += 1
        data['total_time_minutes'] += duration_minutes
        data['active_students'].add(student_id)
        
        today = datetime.now().date()
        if today not in data['daily_engagement']:
            data['daily_engagement'][today] = {
                'sessions': 0,
                'total_minutes': 0,
                'students': set()
            }
        
        daily = data['daily_engagement'][today]
        daily['sessions'] += 1
        daily['total_minutes'] += duration_minutes
        daily['students'].add(student_id)
        
        data['session_history'].append({
            'student_id': student_id,
            'duration': duration_minutes,
            'activity': activity_type,
            'timestamp': datetime.now()
        })
        
        # Calculate metrics
        avg_session_length = data['total_time_minutes'] / data['total_sessions']
        unique_students = len(data['active_students'])
        
        return {
            'avg_session_length': avg_session_length,
            'unique_students': unique_students,
            'total_learning_time': data['total_time_minutes'],
            'total_sessions': data['total_sessions'],
            'today_engagement': daily
        }
    
    def get_engagement_report(self) -> Dict:
        data = StudentEngagementTracker.engagement_data
        if not data['active_students']:
            return {}
        
        return {
            'total_sessions': data['total_sessions'],
            'total_learning_hours': data['total_time_minutes'] / 60,
            'student_participation_rate': len(data['active_students']),
            'avg_engagement_per_student': data['total_sessions'] / len(data['active_students']),
            'avg_session_length': data['total_time_minutes'] / data['total_sessions'],
            'daily_breakdown': {
                date: {
                    'sessions': stats['sessions'],
                    'total_minutes': stats['total_minutes'],
                    'unique_students': len(stats['students'])
                }
                for date, stats in data['daily_engagement'].items()
            }
        }
    
    @classmethod
    def reset_engagement_data(cls):
        """Reset class-level static data"""
        if hasattr(cls, 'engagement_data'):
            delattr(cls, 'engagement_data')


class LearningRecommendationEngine:
    """Personalized recommendations with static content analytics"""
    
    def __init__(self):
        self.student_preferences = {}
        self._initialize_static_data()
    
    def _initialize_static_data(self):
        """Initialize static recommendation data"""
        if not hasattr(LearningRecommendationEngine, 'content_analytics'):
            LearningRecommendationEngine.content_analytics = {
                'content_popularity': {},
                'content_ratings': {},
                'interaction_patterns': {},
                'total_interactions': 0,
                'content_categories': {},
                'student_similarity': {}
            }
    
    def track_content_interaction(self, student_id: str, content_id: str, 
                                interaction_type: str, rating: float = None, 
                                category: str = None) -> Dict:
        analytics = LearningRecommendationEngine.content_analytics
        analytics['total_interactions'] += 1
        
        # Update content popularity
        analytics['content_popularity'][content_id] = analytics['content_popularity'].get(content_id, 0) + 1
        
        # Update ratings
        if rating is not None:
            if content_id not in analytics['content_ratings']:
                analytics['content_ratings'][content_id] = []
            analytics['content_ratings'][content_id].append(rating)
        
        # Track categories
        if category:
            if category not in analytics['content_categories']:
                analytics['content_categories'][category] = set()
            analytics['content_categories'][category].add(content_id)
        
        # Track student preferences
        if student_id not in self.student_preferences:
            self.student_preferences[student_id] = {
                'viewed_content': set(),
                'preferred_types': {},
                'preferred_categories': {},
                'average_rating': 0.0,
                'total_interactions': 0
            }
        
        student_data = self.student_preferences[student_id]
        student_data['viewed_content'].add(content_id)
        student_data['preferred_types'][interaction_type] = student_data['preferred_types'].get(interaction_type, 0) + 1
        student_data['total_interactions'] += 1
        
        if category:
            student_data['preferred_categories'][category] = student_data['preferred_categories'].get(category, 0) + 1
        
        if rating:
            student_data['average_rating'] = (
                (student_data['average_rating'] * (student_data['total_interactions'] - 1) + rating) 
                / student_data['total_interactions']
            )
        
        return {
            'total_interactions': analytics['total_interactions'],
            'content_popularity': analytics['content_popularity'][content_id],
            'student_total_interactions': student_data['total_interactions']
        }
    
    def get_recommendations(self, student_id: str, max_recommendations: int = 5) -> List[str]:
        analytics = LearningRecommendationEngine.content_analytics
        
        if student_id not in self.student_preferences:
            # New student - recommend popular content
            popular_content = sorted(
                analytics['content_popularity'].items(),
                key=lambda x: x[1],
                reverse=True
            )[:max_recommendations]
            return [content[0] for content in popular_content]
        
        student_data = self.student_preferences[student_id]
        viewed_content = student_data['viewed_content']
        
        # Calculate recommendation scores
        recommendations = []
        for content_id, popularity in analytics['content_popularity'].items():
            if content_id not in viewed_content:
                score = popularity  # Base score on popularity
                
                # Adjust based on ratings
                if content_id in analytics['content_ratings']:
                    avg_rating = statistics.mean(analytics['content_ratings'][content_id])
                    score *= (avg_rating / 5.0)
                
                # Adjust based on student preferences
                preferred_types = student_data['preferred_types']
                if preferred_types:
                    # Give bonus for preferred interaction types
                    type_bonus = max(preferred_types.values()) / sum(preferred_types.values())
                    score *= (1 + type_bonus * 0.5)
                
                recommendations.append((content_id, score))
        
        recommendations.sort(key=lambda x: x[1], reverse=True)
        return [rec[0] for rec in recommendations[:max_recommendations]]
    
    def get_content_analytics(self) -> Dict:
        return LearningRecommendationEngine.content_analytics
    
    @classmethod
    def reset_content_analytics(cls):
        """Reset static content analytics"""
        if hasattr(cls, 'content_analytics'):
            delattr(cls, 'content_analytics')


# ==================== FINANCE MODULES ====================

class PortfolioAnalyzer:
    """Investment portfolio analysis with static market data"""
    
    def __init__(self):
        self._initialize_static_data()
    
    def _initialize_static_data(self):
        """Initialize static market data"""
        if not hasattr(PortfolioAnalyzer, 'market_data'):
            PortfolioAnalyzer.market_data = {
                'all_returns': [],
                'risk_metrics': {},
                'sector_performance': {},
                'analysis_count': 0,
                'market_benchmarks': {},
                'historical_volatility': []
            }
    
    def analyze_portfolio(self, portfolio_id: str, returns: List[float], 
                         risk_factors: Dict[str, float], sector: str = None) -> Dict:
        market_data = PortfolioAnalyzer.market_data
        market_data['analysis_count'] += 1
        market_data['all_returns'].extend(returns)
        
        # Calculate portfolio statistics
        avg_return = statistics.mean(returns) if returns else 0
        total_risk = sum(risk_factors.values()) if risk_factors else 0
        volatility = statistics.stdev(returns) if len(returns) > 1 else 0
        
        # Store volatility for market comparison
        market_data['historical_volatility'].append(volatility)
        
        # Compare with market benchmark
        market_avg = statistics.mean(market_data['all_returns']) if market_data['all_returns'] else avg_return
        performance = "Outperforming" if avg_return > market_avg else "Underperforming"
        
        # Track sector performance
        if sector:
            if sector not in market_data['sector_performance']:
                market_data['sector_performance'][sector] = []
            market_data['sector_performance'][sector].append(avg_return)
        
        # Store risk metrics
        market_data['risk_metrics'][portfolio_id] = {
            'avg_return': avg_return,
            'total_risk': total_risk,
            'volatility': volatility,
            'performance': performance,
            'sharpe_ratio': avg_return / total_risk if total_risk > 0 else 0,
            'sector': sector,
            'analysis_date': datetime.now()
        }
        
        # Update market benchmarks
        market_volatility = statistics.mean(market_data['historical_volatility']) if market_data['historical_volatility'] else 0
        market_data['market_benchmarks'] = {
            'average_return': market_avg,
            'average_volatility': market_volatility,
            'total_portfolios_analyzed': market_data['analysis_count']
        }
        
        return market_data['risk_metrics'][portfolio_id]
    
    def get_market_benchmarks(self) -> Dict:
        return PortfolioAnalyzer.market_data.get('market_benchmarks', {})
    
    def get_sector_performance(self) -> Dict:
        sector_data = {}
        for sector, returns in PortfolioAnalyzer.market_data['sector_performance'].items():
            if returns:
                sector_data[sector] = {
                    'average_return': statistics.mean(returns),
                    'return_count': len(returns),
                    'volatility': statistics.stdev(returns) if len(returns) > 1 else 0
                }
        return sector_data
    
    @classmethod
    def reset_market_data(cls):
        """Reset static market data"""
        if hasattr(cls, 'market_data'):
            delattr(cls, 'market_data')


# ==================== COMPREHENSIVE TEST SUITE ====================

class TestStaticVariablesEdTech(unittest.TestCase):
    
    def setUp(self):
        """Reset all static data before each test"""
        AdaptiveLearningEngine().reset_global_stats()
        StudentEngagementTracker.reset_engagement_data()
        LearningRecommendationEngine.reset_content_analytics()
        PortfolioAnalyzer.reset_market_data()
    
    def test_adaptive_learning_engine_static_stats(self):
        """Test that static stats persist across multiple instances"""
        engine1 = AdaptiveLearningEngine()
        engine2 = AdaptiveLearningEngine()
        
        # First assessment
        result1 = engine1.assess_student_performance("S001", "algebra", 85)
        self.assertEqual(result1['total_assessments'], 1)
        self.assertEqual(result1['concept_attempts'], 1)
        
        # Second assessment with different instance
        result2 = engine2.assess_student_performance("S002", "algebra", 70)
        self.assertEqual(result2['total_assessments'], 2)
        self.assertEqual(result2['concept_attempts'], 2)
        self.assertEqual(result2['unique_students_for_concept'], 2)
        
        # Check global stats are shared
        stats = engine1.get_global_stats()
        self.assertEqual(stats['total_assessments'], 2)
        self.assertEqual(len(stats['concept_difficulty']['algebra']['students']), 2)
    
    def test_student_engagement_tracker_class_static(self):
        """Test class-level static variables"""
        tracker1 = StudentEngagementTracker()
        tracker2 = StudentEngagementTracker()
        
        # Record sessions with different instances
        result1 = tracker1.record_session("S001", 45, "video_lecture")
        result2 = tracker2.record_session("S002", 30, "quiz")
        result3 = tracker1.record_session("S001", 60, "assignment")
        
        self.assertEqual(result1['total_sessions'], 1)
        self.assertEqual(result2['total_sessions'], 2)
        self.assertEqual(result3['total_sessions'], 3)
        self.assertEqual(result3['unique_students'], 2)
        
        # Check engagement report
        report = tracker2.get_engagement_report()
        self.assertEqual(report['total_sessions'], 3)
        self.assertEqual(report['student_participation_rate'], 2)
        self.assertAlmostEqual(report['total_learning_hours'], (45+30+60)/60)
    
    def test_learning_recommendation_engine(self):
        """Test recommendation engine with static content analytics"""
        engine1 = LearningRecommendationEngine()
        engine2 = LearningRecommendationEngine()
        
        # Track interactions
        engine1.track_content_interaction("S001", "VID_001", "video", 4.5, "math")
        engine2.track_content_interaction("S002", "VID_001", "video", 4.0, "math")
        engine1.track_content_interaction("S001", "QUIZ_001", "quiz", 3.5, "math")
        engine2.track_content_interaction("S002", "ARTICLE_001", "reading", 4.8, "science")
        
        # Check analytics
        analytics = engine1.get_content_analytics()
        self.assertEqual(analytics['total_interactions'], 4)
        self.assertEqual(analytics['content_popularity']['VID_001'], 2)
        
        # Test recommendations for new student
        recommendations = engine1.get_recommendations("S003")
        self.assertTrue(len(recommendations) > 0)
        self.assertIn("VID_001", recommendations)  # Most popular content
        
        # Test recommendations for existing student
        s001_recommendations = engine1.get_recommendations("S001")
        self.assertNotIn("VID_001", s001_recommendations)  # Already viewed
        self.assertNotIn("QUIZ_001", s001_recommendations)  # Already viewed
    
    def test_portfolio_analyzer_static_market_data(self):
        """Test portfolio analyzer with static market data"""
        analyzer1 = PortfolioAnalyzer()
        analyzer2 = PortfolioAnalyzer()
        
        # Analyze different portfolios
        result1 = analyzer1.analyze_portfolio(
            "Tech_ETF", 
            [0.15, 0.12, 0.08, -0.05, 0.20],
            {'volatility': 0.08, 'beta': 1.2},
            "technology"
        )
        
        result2 = analyzer2.analyze_portfolio(
            "Bond_Fund",
            [0.04, 0.05, 0.03, 0.06, 0.04],
            {'volatility': 0.02, 'beta': 0.3},
            "fixed_income"
        )
        
        # Check market benchmarks
        benchmarks = analyzer1.get_market_benchmarks()
        self.assertEqual(benchmarks['total_portfolios_analyzed'], 2)
        
        # Check sector performance
        sector_perf = analyzer1.get_sector_performance()
        self.assertIn("technology", sector_perf)
        self.assertIn("fixed_income", sector_perf)
        
        # Verify static data persistence
        self.assertEqual(PortfolioAnalyzer.market_data['analysis_count'], 2)
        self.assertEqual(len(PortfolioAnalyzer.market_data['all_returns']), 10)
    
    def test_static_variables_independence(self):
        """Test that different classes maintain independent static variables"""
        # Use all systems
        learning_engine = AdaptiveLearningEngine()
        engagement_tracker = StudentEngagementTracker()
        recommendation_engine = LearningRecommendationEngine()
        portfolio_analyzer = PortfolioAnalyzer()
        
        # Perform operations
        learning_engine.assess_student_performance("S001", "math", 90)
        engagement_tracker.record_session("S001", 30, "quiz")
        recommendation_engine.track_content_interaction("S001", "CONTENT_001", "video", 4.5)
        portfolio_analyzer.analyze_portfolio("PORT_001", [0.1, 0.2], {})
        
        # Verify each maintains independent static state
        self.assertEqual(learning_engine.get_global_stats()['total_assessments'], 1)
        self.assertEqual(engagement_tracker.get_engagement_report()['total_sessions'], 1)
        self.assertEqual(recommendation_engine.get_content_analytics()['total_interactions'], 1)
        self.assertEqual(portfolio_analyzer.get_market_benchmarks()['total_portfolios_analyzed'], 1)
    
    def test_edge_cases_and_error_handling(self):
        """Test edge cases and error handling"""
        engine = AdaptiveLearningEngine()
        
        # Empty inputs
        result = engine.assess_student_performance("", "", 0)
        self.assertIn('student_mastery', result)
        
        # Negative scores
        result = engine.assess_student_performance("S001", "math", -10)
        self.assertIn('student_mastery', result)
        
        # Very high scores
        result = engine.assess_student_performance("S002", "math", 150)
        self.assertIn('student_mastery', result)
        
        # Check stats accumulation
        stats = engine.get_global_stats()
        self.assertEqual(stats['total_assessments'], 3)


class TestPerformanceAndScalability(unittest.TestCase):
    
    def setUp(self):
        """Reset before each test"""
        AdaptiveLearningEngine().reset_global_stats()
        LearningRecommendationEngine.reset_content_analytics()
    
    def test_large_scale_operations(self):
        """Test performance with large datasets"""
        engine = AdaptiveLearningEngine()
        
        # Simulate 1000 assessments
        for i in range(1000):
            student_id = f"S{i % 100}"  # 100 unique students
            concept = f"concept_{i % 10}"  # 10 concepts
            score = 60 + (i % 40)  # Scores between 60-100
            engine.assess_student_performance(student_id, concept, score)
        
        stats = engine.get_global_stats()
        self.assertEqual(stats['total_assessments'], 1000)
        self.assertEqual(len(stats['concept_difficulty']), 10)
        
        # Check that each concept has multiple students
        for concept_stats in stats['concept_difficulty'].values():
            self.assertGreater(len(concept_stats['students']), 1)
    
    def test_recommendation_engine_scalability(self):
        """Test recommendation engine with large content catalog"""
        engine = LearningRecommendationEngine()
        
        # Add 500 content items with interactions
        for i in range(500):
            content_id = f"CONTENT_{i:03d}"
            student_id = f"S{i % 50}"  # 50 students
            rating = 3 + (i % 3)  # Ratings 3, 4, or 5
            engine.track_content_interaction(student_id, content_id, "video", rating, f"category_{i % 5}")
        
        analytics = engine.get_content_analytics()
        self.assertEqual(analytics['total_interactions'], 500)
        self.assertEqual(len(analytics['content_popularity']), 500)
        
        # Test recommendation performance
        import time
        start_time = time.time()
        recommendations = engine.get_recommendations("S999")  # New student
        end_time = time.time()
        
        self.assertTrue(len(recommendations) > 0)
        self.assertLess(end_time - start_time, 1.0)  # Should be fast (<1 second)


# ==================== DEMONSTRATION AND USAGE EXAMPLES ====================

def demonstrate_edtech_usage():
    """Demonstrate complete EdTech system usage"""
    print("=== EdTech System Demonstration ===")
    
    # Adaptive Learning
    print("\n1. Adaptive Learning Engine:")
    ale = AdaptiveLearningEngine()
    ale.assess_student_performance("Alice", "Python", 85)
    ale.assess_student_performance("Bob", "Python", 70)
    ale.assess_student_performance("Charlie", "SQL", 90)
    
    stats = ale.get_global_stats()
    print(f"Total assessments: {stats['total_assessments']}")
    print(f"Python difficulty: {stats['concept_difficulty']['Python']['total_score'] / stats['concept_difficulty']['Python']['attempts']:.1f}%")
    
    # Student Engagement
    print("\n2. Student Engagement Tracker:")
    tracker = StudentEngagementTracker()
    tracker.record_session("Alice", 45, "coding_exercise")
    tracker.record_session("Bob", 30, "video_lecture")
    tracker.record_session("Alice", 60, "project_work")
    
    report = tracker.get_engagement_report()
    print(f"Total learning hours: {report['total_learning_hours']:.1f}")
    print(f"Average session length: {report['avg_session_length']:.1f} minutes")
    
    # Learning Recommendations
    print("\n3. Learning Recommendation Engine:")
    recommender = LearningRecommendationEngine()
    recommender.track_content_interaction("Alice", "PYTHON_BASICS", "video", 4.5, "programming")
    recommender.track_content_interaction("Bob", "PYTHON_BASICS", "video", 4.0, "programming")
    recommender.track_content_interaction("Alice", "SQL_TUTORIAL", "interactive", 4.8, "databases")
    
    alice_recs = recommender.get_recommendations("Alice")
    bob_recs = recommender.get_recommendations("Bob")
    new_student_recs = recommender.get_recommendations("NewStudent")
    
    print(f"Alice's recommendations: {alice_recs}")
    print(f"Bob's recommendations: {bob_recs}")
    print(f"New student recommendations: {new_student_recs}")


def demonstrate_finance_usage():
    """Demonstrate complete finance system usage"""
    print("\n=== Finance System Demonstration ===")
    
    analyzer = PortfolioAnalyzer()
    
    # Analyze different portfolios
    print("\n1. Portfolio Analysis:")
    tech_result = analyzer.analyze_portfolio(
        "Tech_Growth", 
        [0.18, 0.22, -0.05, 0.15, 0.25],
        {'volatility': 0.12, 'beta': 1.4},
        "technology"
    )
    
    bond_result = analyzer.analyze_portfolio(
        "Conservative_Bonds",
        [0.04, 0.03, 0.05, 0.04, 0.03],
        {'volatility': 0.02, 'beta': 0.2},
        "fixed_income"
    )
    
    print(f"Tech portfolio Sharpe ratio: {tech_result['sharpe_ratio']:.2f}")
    print(f"Bond portfolio performance: {bond_result['performance']}")
    
    # Market benchmarks
    print("\n2. Market Benchmarks:")
    benchmarks = analyzer.get_market_benchmarks()
    print(f"Market average return: {benchmarks['average_return']:.2%}")
    print(f"Portfolios analyzed: {benchmarks['total_portfolios_analyzed']}")
    
    # Sector performance
    print("\n3. Sector Performance:")
    sector_perf = analyzer.get_sector_performance()
    for sector, data in sector_perf.items():
        print(f"{sector}: {data['average_return']:.2%} average return")


if __name__ == "__main__":
    # Run demonstrations
    demonstrate_edtech_usage()
    demonstrate_finance_usage()
    
    print("\n" + "="*50)
    print("RUNNING COMPREHENSIVE TEST SUITE...")
    print("="*50)
    
    # Run all tests
    unittest.main(argv=[''], verbosity=2, exit=False)